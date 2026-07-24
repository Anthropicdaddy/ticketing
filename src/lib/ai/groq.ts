import Groq from "groq-sdk";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface AgentTool {
  name: string;
  description: string;
  execute: (args: Record<string, string>) => Promise<string>;
}

const tools: AgentTool[] = [
  {
    name: "query_database",
    description: "Execute a read-only SQL query to fetch data from the database",
    execute: async (args) => {
      try {
        const result = await db.execute(sql.raw(args.query));
        return JSON.stringify(result, null, 2);
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : "Unknown error"}`;
      }
    },
  },
  {
    name: "update_order_status",
    description: "Update an order's status. Status values: pending_approval, approved, rejected, completed",
    execute: async (args) => {
      try {
        const result = await db.execute(
          sql.raw(`UPDATE orders SET status = '${args.status}', approved_at = NOW() WHERE id = '${args.order_id}'`)
        );
        return `Order ${args.order_id} updated to status: ${args.status}`;
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : "Unknown error"}`;
      }
    },
  },
  {
    name: "create_event",
    description: "Create a new event in the database",
    execute: async (args) => {
      try {
        const result = await db.execute(
          sql.raw(`INSERT INTO events (title_ja, title_en, title_zh, venue, event_date, status) VALUES ('${args.title}', '${args.title}', '${args.title}', '${args.venue}', '${args.date}', 'active')`)
        );
        return `Event "${args.title}" created successfully at ${args.venue}`;
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : "Unknown error"}`;
      }
    },
  },
  {
    name: "delete_event",
    description: "Delete an event from the database",
    execute: async (args) => {
      try {
        await db.execute(sql.raw(`DELETE FROM events WHERE id = '${args.event_id}'`));
        return `Event ${args.event_id} deleted`;
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : "Unknown error"}`;
      }
    },
  },
  {
    name: "get_stats",
    description: "Get overall statistics: total orders, revenue, tickets sold, pending approvals",
    execute: async () => {
      try {
        const stats = await db.execute(sql.raw(`
          SELECT
            (SELECT COUNT(*) FROM orders) as total_orders,
            (SELECT COUNT(*) FROM orders WHERE status = 'pending_approval') as pending,
            (SELECT COUNT(*) FROM orders WHERE status = 'completed') as completed,
            (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status IN ('approved', 'completed')) as revenue,
            (SELECT COUNT(*) FROM tickets WHERE status = 'sold') as tickets_sold
        `));
        return JSON.stringify(stats, null, 2);
      } catch (e) {
        return `Error: ${e instanceof Error ? e.message : "Unknown error"}`;
      }
    },
  },
];

export async function chatWithAgent(messages: ChatMessage[]): Promise<string> {
  const systemMessage: ChatMessage = {
    role: "system",
    content: `You are an AI agent for Kippo🌸, a Japanese ticketing platform. You have direct access to the database and can perform actions.

CAPABILITIES:
- Query any data from the database (orders, events, tickets, payments)
- Approve or reject orders
- Create or delete events
- View statistics and analytics
- Send emails to customers

AVAILABLE TOOLS:
- query_database: Run SQL SELECT queries
- update_order_status: Change order status (approve/reject/complete)
- create_event: Add new events
- delete_event: Remove events
- get_stats: Get dashboard statistics

RULES:
- Always respond in Japanese unless the user writes in another language
- When performing destructive actions (delete, reject), confirm with the user first
- Show query results in a readable format
- Be concise and helpful
- If a query fails, explain why and suggest fixes

DATABASE SCHEMA:
- events: id, title_ja, title_en, title_zh, venue, event_date, status
- orders: id, customer_name, customer_email, status, total_amount, created_at
- tickets: id, event_id, tier_id, ticket_code, status
- ticket_tiers: id, event_id, name_ja, price, quantity_total, quantity_sold`,
  };

  try {
    // First, determine if we need to use a tool
    const completion = await groq.chat.completions.create({
      messages: [systemMessage, ...messages],
      model: "llama3-8b-8192",
      temperature: 0.3,
      max_tokens: 1024,
      functions: [
        {
          name: "query_database",
          description: "Execute a read-only SQL query",
          parameters: {
            type: "object",
            properties: {
              query: { type: "string", description: "SQL SELECT query" },
            },
            required: ["query"],
          },
        },
        {
          name: "update_order_status",
          description: "Update an order's status",
          parameters: {
            type: "object",
            properties: {
              order_id: { type: "string", description: "Order ID" },
              status: { type: "string", description: "New status: approved, rejected, completed" },
            },
            required: ["order_id", "status"],
          },
        },
        {
          name: "create_event",
          description: "Create a new event",
          parameters: {
            type: "object",
            properties: {
              title: { type: "string", description: "Event title" },
              venue: { type: "string", description: "Venue name" },
              date: { type: "string", description: "Event date (YYYY-MM-DD)" },
            },
            required: ["title", "venue", "date"],
          },
        },
        {
          name: "delete_event",
          description: "Delete an event",
          parameters: {
            type: "object",
            properties: {
              event_id: { type: "string", description: "Event ID to delete" },
            },
            required: ["event_id"],
          },
        },
        {
          name: "get_stats",
          description: "Get dashboard statistics",
          parameters: { type: "object", properties: {} },
        },
      ],
      function_call: "auto",
    });

    const choice = completion.choices[0];

    // If the model wants to call a tool
    if (choice.message.function_call) {
      const funcName = choice.message.function_call.name;
      const funcArgs = JSON.parse(choice.message.function_call.arguments || "{}");

      const tool = tools.find((t) => t.name === funcName);
      if (tool) {
        const result = await tool.execute(funcArgs);

        // Follow up with a natural language response
        const followUp = await groq.chat.completions.create({
          messages: [
            systemMessage,
            ...messages,
            choice.message,
            {
              role: "function",
              name: funcName,
              content: result,
            },
          ],
          model: "llama3-8b-8192",
          temperature: 0.7,
          max_tokens: 1024,
        });

        return followUp.choices[0]?.message?.content || result;
      }
    }

    return choice.message?.content || "申し訳ありません。回答を生成できませんでした。";
  } catch (error) {
    console.error("AI Agent error:", error);
    return "エラーが発生しました。もう一度お試しください。";
  }
}
