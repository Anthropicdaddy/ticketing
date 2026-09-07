import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cars } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { make, model, year, price, mileage, transmission, fuel, status, description, imageUrl } = body;

    const [updated] = await db
      .update(cars)
      .set({
        make,
        model,
        year: Number(year),
        price: String(price),
        mileage: Number(mileage),
        transmission,
        fuel,
        status,
        description,
        imageUrl,
        updatedAt: new Date(),
      })
      .where(eq(cars.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, car: updated });
  } catch (error) {
    console.error("Admin update car error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.delete(cars).where(eq(cars.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin delete car error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}