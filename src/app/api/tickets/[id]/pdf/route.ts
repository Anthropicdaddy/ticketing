import { NextRequest, NextResponse } from "next/server";
import { generateTicketPDF } from "@/lib/pdf/generate";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const ticket = {
      ticketCode: `TK-2026-${id.slice(0, 4).toUpperCase()}`,
      password: "xK9mP2vL",
      eventName: "よひろ 2026",
      eventDate: "2026年8月15日 19:00",
      venue: "東京ドーム",
      tier: "VIP席",
      customerName: "テスト太郎",
    };

    const pdfBytes = await generateTicketPDF(ticket);

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="ticket-${ticket.ticketCode}.pdf"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
