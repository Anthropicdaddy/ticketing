import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { emailLogs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const logs = await db
      .select()
      .from(emailLogs)
      .orderBy(desc(emailLogs.sentAt));

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Emails API error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
