import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cars } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [car] = await db.select().from(cars).where(eq(cars.id, id));

    if (!car) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error("Public car detail API error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}