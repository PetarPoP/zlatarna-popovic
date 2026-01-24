import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type AppointmentFormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  notes?: string;
  turnstileToken?: string; // TODO: Make required after re-enabling Turnstile
};

const serviceLabels: Record<string, string> = {
  consultation: "Konzultacija",
  engraving: "Lasersko graviranje",
  repair: "Popravak nakita",
  custom: "Izrada po narudžbi",
  appraisal: "Procjena vrijednosti",
};

export async function POST(request: Request) {
  try {
    const body: AppointmentFormData = await request.json();
    const { name, email, phone, date, time, service, notes } = body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time || !service) {
      return NextResponse.json(
        { success: false, error: "Sva obavezna polja moraju biti popunjena" },
        { status: 400 }
      );
    }

    // TODO: Re-enable Turnstile verification after testing
    // const turnstileResponse = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/verify-turnstile`,
    //   {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ token: turnstileToken }),
    //   }
    // );

    // const turnstileResult = await turnstileResponse.json();
    // if (!turnstileResult.success) {
    //   return NextResponse.json(
    //     { success: false, error: "Verifikacija nije uspjela. Molimo pokušajte ponovo." },
    //     { status: 400 }
    //   );
    // }

    // Check if slot is already taken using Prisma
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        appointmentDate: new Date(date),
        appointmentTime: new Date(`1970-01-01T${time}:00`),
        status: { not: "cancelled" },
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { success: false, error: "Ovaj termin je već zauzet. Molimo odaberite drugi termin." },
        { status: 400 }
      );
    }

    // Save to database using Prisma
    await prisma.appointment.create({
      data: {
        name,
        email,
        phone,
        appointmentDate: new Date(date),
        appointmentTime: new Date(`1970-01-01T${time}:00`),
        service,
        notes: notes || null,
      },
    });

    const serviceLabel = serviceLabels[service] || service;
    const formattedDate = new Date(date).toLocaleDateString("hr-HR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Send email notification to store
    const contactEmail = process.env.CONTACT_EMAIL || "info@zlatarna-popovic.ba";
    
    await resend.emails.send({
      from: "Zlatarna Popović <onboarding@resend.dev>",
      to: contactEmail,
      subject: `Nova rezervacija termina - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #18181b; padding: 32px 40px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 300; letter-spacing: 4px;">ZLATARNA POPOVIĆ</h1>
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px 20px; margin-bottom: 32px; border-radius: 0 4px 4px 0;">
                        <p style="margin: 0; color: #92400e; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Nova rezervacija termina</p>
                      </div>
                      
                      <h2 style="margin: 0 0 24px 0; color: #18181b; font-size: 20px; font-weight: 600;">Podaci o klijentu</h2>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7;">
                            <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Ime i prezime</span><br>
                            <span style="color: #18181b; font-size: 16px; font-weight: 500;">${name}</span>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7;">
                            <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</span><br>
                            <a href="mailto:${email}" style="color: #18181b; font-size: 16px; text-decoration: none;">${email}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding: 12px 0; border-bottom: 1px solid #e4e4e7;">
                            <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Telefon</span><br>
                            <a href="tel:${phone}" style="color: #18181b; font-size: 16px; text-decoration: none;">${phone}</a>
                          </td>
                        </tr>
                      </table>
                      
                      <h2 style="margin: 0 0 24px 0; color: #18181b; font-size: 20px; font-weight: 600;">Detalji termina</h2>
                      
                      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
                        <tr>
                          <td>
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td width="50%" style="padding: 8px 0;">
                                  <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Datum</span><br>
                                  <span style="color: #18181b; font-size: 18px; font-weight: 600;">${formattedDate}</span>
                                </td>
                                <td width="50%" style="padding: 8px 0;">
                                  <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Vrijeme</span><br>
                                  <span style="color: #18181b; font-size: 18px; font-weight: 600;">${time}h</span>
                                </td>
                              </tr>
                              <tr>
                                <td colspan="2" style="padding: 16px 0 8px 0;">
                                  <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Usluga</span><br>
                                  <span style="color: #18181b; font-size: 16px; font-weight: 500;">${serviceLabel}</span>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                      
                      ${notes ? `
                      <div style="margin-top: 24px;">
                        <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Napomene</span>
                        <p style="margin: 8px 0 0 0; color: #3f3f46; font-size: 14px; line-height: 1.6; background-color: #fafafa; padding: 16px; border-radius: 4px;">${notes}</p>
                      </div>
                      ` : ""}
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

    // Send confirmation to user
    await resend.emails.send({
      from: "Zlatarna Popović <onboarding@resend.dev>",
      to: email,
      subject: "Potvrda rezervacije - Zlatarna Popović",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background-color: #18181b; padding: 32px 40px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 300; letter-spacing: 4px;">ZLATARNA POPOVIĆ</h1>
                    </td>
                  </tr>
                  <!-- Success Banner -->
                  <tr>
                    <td style="background-color: #dcfce7; padding: 20px 40px; text-align: center;">
                      <p style="margin: 0; color: #166534; font-size: 16px; font-weight: 600;">Vaša rezervacija je primljena!</p>
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 24px 0; color: #3f3f46; font-size: 16px; line-height: 1.6;">Poštovani/a <strong>${name}</strong>,</p>
                      <p style="margin: 0 0 32px 0; color: #3f3f46; font-size: 16px; line-height: 1.6;">Hvala vam na rezervaciji. Kontaktirat ćemo vas telefonom radi potvrde termina.</p>
                      
                      <div style="background-color: #fafafa; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                        <h2 style="margin: 0 0 20px 0; color: #18181b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">Detalji rezervacije</h2>
                        
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="50%" style="padding: 12px 0; border-bottom: 1px solid #e4e4e7;">
                              <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Datum</span><br>
                              <span style="color: #18181b; font-size: 16px; font-weight: 600;">${formattedDate}</span>
                            </td>
                            <td width="50%" style="padding: 12px 0; border-bottom: 1px solid #e4e4e7;">
                              <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Vrijeme</span><br>
                              <span style="color: #18181b; font-size: 16px; font-weight: 600;">${time}h</span>
                            </td>
                          </tr>
                          <tr>
                            <td colspan="2" style="padding: 12px 0;">
                              <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Usluga</span><br>
                              <span style="color: #18181b; font-size: 16px; font-weight: 500;">${serviceLabel}</span>
                            </td>
                          </tr>
                        </table>
                        
                        ${notes ? `
                        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e4e4e7;">
                          <span style="color: #71717a; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Vaše napomene</span>
                          <p style="margin: 8px 0 0 0; color: #3f3f46; font-size: 14px; line-height: 1.6;">${notes}</p>
                        </div>
                        ` : ""}
                      </div>
                      
                      <p style="margin: 0 0 8px 0; color: #3f3f46; font-size: 14px;">S poštovanjem,</p>
                      <p style="margin: 0; color: #18181b; font-size: 16px; font-weight: 600;">Zlatarna Popović</p>
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #fafafa; padding: 24px 40px; text-align: center; border-top: 1px solid #e4e4e7;">
                      <p style="margin: 0 0 8px 0; color: #71717a; font-size: 14px;">Kneza Mutimira 27, Livno</p>
                      <p style="margin: 0 0 8px 0; color: #71717a; font-size: 14px;">
                        <a href="tel:+38763330632" style="color: #71717a; text-decoration: none;">+387 63 330 632</a>
                      </p>
                      <p style="margin: 0; color: #71717a; font-size: 14px;">
                        <a href="mailto:info@zlatarna-popovic.ba" style="color: #71717a; text-decoration: none;">info@zlatarna-popovic.ba</a>
                      </p>
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Appointment form error:", error);
    
    // Check for unique constraint violation
    if (error instanceof Error && error.message.includes("unique")) {
      return NextResponse.json(
        { success: false, error: "Ovaj termin je već zauzet. Molimo odaberite drugi termin." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Došlo je do greške. Molimo pokušajte kasnije." },
      { status: 500 }
    );
  }
}

// GET endpoint to check available times for a date
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date) {
      return NextResponse.json(
        { success: false, error: "Date is required" },
        { status: 400 }
      );
    }

    // Get booked appointments using Prisma
    const bookedAppointments = await prisma.appointment.findMany({
      where: {
        appointmentDate: new Date(date),
        status: { not: "cancelled" },
      },
      select: {
        appointmentTime: true,
      },
    });

    const bookedTimeStrings = bookedAppointments.map((row) => {
      const time = row.appointmentTime;
      return `${time.getUTCHours().toString().padStart(2, "0")}:${time.getUTCMinutes().toString().padStart(2, "0")}`;
    });

    return NextResponse.json({ 
      success: true, 
      bookedTimes: bookedTimeStrings 
    });
  } catch (error) {
    console.error("Get appointments error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
