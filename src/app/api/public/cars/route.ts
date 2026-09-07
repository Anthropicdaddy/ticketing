import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cars } from "@/lib/db/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const make = searchParams.get("make");
    const maxPrice = searchParams.get("maxPrice");
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 12;

    let query = db
      .select()
      .from(cars)
      .where(eq(cars.status, "available"))
      .orderBy(desc(cars.createdAt))
      .limit(limit);

    if (make && make !== "Any Make") {
      query = db
        .select()
        .from(cars)
        .where(sql`${cars.status} = 'available' AND ${cars.make} = ${make}`)
        .orderBy(desc(cars.createdAt))
        .limit(limit);
    }

    if (maxPrice) {
      query = db
        .select()
        .from(cars)
        .where(sql`${cars.status} = 'available' AND ${cars.price} <= ${maxPrice}`)
        .orderBy(desc(cars.createdAt))
        .limit(limit);
    }

    const allCars = await query;

    return NextResponse.json(allCars);
  } catch (error) {
    console.error("Public cars API error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}