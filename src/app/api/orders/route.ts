import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, eventId, tierId, quantity } = body;

    if (!customerName || !customerEmail || !eventId || !tierId || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const order = {
      id: `ORD-${Date.now()}`,
      customerName,
      customerEmail,
      customerPhone,
      eventId,
      tierId,
      quantity,
      status: "pending_approval",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, order });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Orders API" });
}
