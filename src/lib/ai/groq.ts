import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function chatWithAI(messages: ChatMessage[]) {
  const systemMessage: ChatMessage = {
    role: "system",
    content: `You are an AI assistant for a ticketing platform in Japan. You help administrators manage events, orders, and ticket sales.

You can answer questions about:
- Pending approvals and orders
- Event information and ticket availability
- Revenue and sales statistics
- Customer information

Always respond in Japanese unless the user writes in another language. Be concise and helpful.

Available data (for reference):
- Total events: 3
- Pending orders: 12
- Total revenue: ¥2,340,000
- Tickets sold: 289`,
  };

  const completion = await groq.chat.completions.create({
    messages: [systemMessage, ...messages],
    model: "llama3-8b-8192",
    temperature: 0.7,
    max_tokens: 1024,
  });

  return completion.choices[0]?.message?.content || "申し訳ありません。回答を生成できませんでした。";
}
