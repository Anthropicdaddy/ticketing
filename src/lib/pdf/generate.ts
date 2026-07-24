import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface TicketData {
  ticketCode: string;
  password: string;
  eventName: string;
  eventDate: string;
  venue: string;
  tier: string;
  customerName: string;
}

export async function generateTicketPDF(ticket: TicketData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const page = pdfDoc.addPage([595, 842]);

  const primaryColor = rgb(0.13, 0.13, 0.13);
  const accentColor = rgb(0.9, 0.2, 0.3);

  page.drawRectangle({
    x: 0,
    y: 0,
    width: 595,
    height: 120,
    color: primaryColor,
  });

  page.drawText("TICKET", {
    x: 50,
    y: 80,
    size: 36,
    font: helveticaBold,
    color: rgb(1, 1, 1),
  });

  page.drawText(ticket.ticketCode, {
    x: 50,
    y: 50,
    size: 18,
    font: helvetica,
    color: rgb(0.8, 0.8, 0.8),
  });

  page.drawRectangle({
    x: 50,
    y: 160,
    width: 495,
    height: 200,
    color: rgb(0.98, 0.98, 0.98),
    borderColor: rgb(0.9, 0.9, 0.9),
    borderWidth: 1,
  });

  const labelX = 70;
  const valueX = 250;
  let y = 330;

  const drawField = (label: string, value: string) => {
    page.drawText(label, {
      x: labelX,
      y,
      size: 10,
      font: helvetica,
      color: rgb(0.5, 0.5, 0.5),
    });
    page.drawText(value, {
      x: valueX,
      y,
      size: 12,
      font: helveticaBold,
      color: primaryColor,
    });
    y -= 30;
  };

  drawField("EVENT", ticket.eventName);
  drawField("DATE", ticket.eventDate);
  drawField("VENUE", ticket.venue);
  drawField("SEAT", ticket.tier);
  drawField("NAME", ticket.customerName);

  page.drawRectangle({
    x: 50,
    y: 400,
    width: 495,
    height: 2,
    color: accentColor,
  });

  page.drawText("IMPORTANT NOTICE", {
    x: 50,
    y: 440,
    size: 14,
    font: helveticaBold,
    color: accentColor,
  });

  page.drawText("This ticket is password protected.", {
    x: 50,
    y: 465,
    size: 10,
    font: helvetica,
    color: primaryColor,
  });

  page.drawText("Please keep this PDF and password safe.", {
    x: 50,
    y: 480,
    size: 10,
    font: helvetica,
    color: primaryColor,
  });

  page.drawText("Do not share your ticket password with others.", {
    x: 50,
    y: 495,
    size: 10,
    font: helvetica,
    color: primaryColor,
  });

  const pdfBytes = await pdfDoc.save();

  return pdfBytes;
}
