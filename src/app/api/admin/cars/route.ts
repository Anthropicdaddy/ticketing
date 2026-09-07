import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cars } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const allCars = await db
      .select()
      .from(cars)
      .orderBy(desc(cars.createdAt));

    return NextResponse.json(allCars);
  } catch (error) {
    console.error("Admin cars API error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { make, model, year, price, mileage, transmission, fuel, status, description, imageUrl } = body;

    if (!make || !model || !year || !price || !mileage || !transmission || !fuel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [inserted] = await db
      .insert(cars)
      .values({
        make,
        model,
        year: Number(year),
        price: String(price),
        mileage: Number(mileage),
        transmission,
        fuel,
        status: status || "available",
        description: description || null,
        imageUrl: imageUrl || null,
      })
      .returning();

    return NextResponse.json({ success: true, car: inserted });
  } catch (error) {
    console.error("Admin create car error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}