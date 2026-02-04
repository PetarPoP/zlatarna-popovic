import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Zlatarna Popović <onboarding@resend.dev>";

// GET /api/admin/appointments - Fetch all appointments
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const date = searchParams.get("date");

    const where: Record<string, unknown> = {};
    
    if (status && status !== "all") {
      where.status = status;
    }
    
    if (date) {
      where.appointmentDate = new Date(date);
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: [
        { appointmentDate: "desc" },
        { appointmentTime: "desc" },
      ],
    });

    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/appointments - Update appointment status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing id or status" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status },
    });

    if ((status === "confirmed" || status === "cancelled") && appointment.email) {
      const formattedDate = appointment.appointmentDate.toLocaleDateString("hr-HR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const timeString = appointment.appointmentTime.toISOString().substring(11, 16);
      const email = appointment.email;

      if (status === "confirmed") {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: "Vaš termin je potvrđen - Zlatarna Popović",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
                <tr>
                  <td align="center">
                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                      <tr>
                        <td style="background-color:#18181b;padding:32px 40px;text-align:center;">
                          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:300;letter-spacing:4px;">ZLATARNA POPOVIĆ</h1>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:40px;">
                          <p style="margin:0 0 16px 0;color:#3f3f46;font-size:16px;line-height:1.6;">
                            Poštovani/a <strong>${appointment.name}</strong>,
                          </p>
                          <p style="margin:0 0 24px 0;color:#3f3f46;font-size:16px;line-height:1.6;">
                            Vaš termin je potvrđen. Radujemo se vašem dolasku.
                          </p>
                          <div style="background-color:#fafafa;border-radius:8px;padding:20px;margin-bottom:24px;">
                            <p style="margin:0 0 8px 0;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Detalji termina</p>
                            <p style="margin:0;color:#18181b;font-size:14px;line-height:1.6;">
                              <strong>Datum:</strong> ${formattedDate}<br />
                              <strong>Vrijeme:</strong> ${timeString}h
                            </p>
                          </div>
                          <p style="margin:0 0 8px 0;color:#3f3f46;font-size:14px;">S poštovanjem,</p>
                          <p style="margin:0;color:#18181b;font-size:16px;font-weight:600;">Zlatarna Popović</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });
      } else {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: email,
          subject: "Obavijest o terminu - Zlatarna Popović",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
                <tr>
                  <td align="center">
                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
                      <tr>
                        <td style="background-color:#18181b;padding:32px 40px;text-align:center;">
                          <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:300;letter-spacing:4px;">ZLATARNA POPOVIĆ</h1>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:40px;">
                          <p style="margin:0 0 16px 0;color:#3f3f46;font-size:16px;line-height:1.6;">
                            Poštovani/a <strong>${appointment.name}</strong>,
                          </p>
                          <p style="margin:0 0 24px 0;color:#3f3f46;font-size:16px;line-height:1.6;">
                            Izvinjavamo se radi odbijenog termina. Nažalost u traženom terminu nismo u mogućnosti primiti vas. Molimo kontaktirajte nas kako bismo zajedno pronašli drugi datum koji vama odgovara.
                          </p>
                          <div style="background-color:#fafafa;border-radius:8px;padding:20px;margin-bottom:24px;">
                            <p style="margin:0 0 8px 0;color:#71717a;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Zatraženi termin</p>
                            <p style="margin:0;color:#18181b;font-size:14px;line-height:1.6;">
                              <strong>Datum:</strong> ${formattedDate}<br />
                              <strong>Vrijeme:</strong> ${timeString}h
                            </p>
                          </div>
                          <p style="margin:0 0 8px 0;color:#3f3f46;font-size:14px;">S poštovanjem,</p>
                          <p style="margin:0;color:#18181b;font-size:16px;font-weight:600;">Zlatarna Popović</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        });
      }
    }

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/appointments - Delete appointment
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id" },
        { status: 400 }
      );
    }

    await prisma.appointment.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete appointment" },
      { status: 500 }
    );
  }
}
