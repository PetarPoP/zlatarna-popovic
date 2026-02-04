import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Zlatarna Popović <onboarding@resend.dev>";

type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  turnstileToken?: string; // TODO: Make required after re-enabling Turnstile
};

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
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

    // Save to database using Prisma
    await prisma.inquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
      },
    });

    // Send email notification
    const contactEmail = process.env.CONTACT_EMAIL || "info@zlatarna-popovic.ba";
    
    await resend.emails.send({
      from: FROM_EMAIL,
      to: contactEmail,
      subject: `Novi upit od ${name}`,
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
                      <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px 20px; margin-bottom: 32px; border-radius: 0 4px 4px 0;">
                        <p style="margin: 0; color: #1e40af; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Novi upit s web stranice</p>
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
                            ${phone ? `<a href="tel:${phone}" style="color: #18181b; font-size: 16px; text-decoration: none;">${phone}</a>` : `<span style="color: #a1a1aa; font-size: 16px; font-style: italic;">Nije navedeno</span>`}
                          </td>
                        </tr>
                      </table>
                      
                      <h2 style="margin: 0 0 16px 0; color: #18181b; font-size: 20px; font-weight: 600;">Poruka</h2>
                      <div style="background-color: #fafafa; border-radius: 8px; padding: 20px;">
                        <p style="margin: 0; color: #3f3f46; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                      </div>
                      
                      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e4e4e7;">
                        <a href="mailto:${email}" style="display: inline-block; background-color: #18181b; color: #ffffff; padding: 12px 24px; text-decoration: none; font-size: 14px; font-weight: 500; border-radius: 4px;">Odgovori na email</a>
                      </div>
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
      from: FROM_EMAIL,
      to: email.trim(),
      subject: "Primili smo vaš upit - Zlatarna Popović",
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
                      <p style="margin: 0; color: #166534; font-size: 16px; font-weight: 600;">Hvala vam na upitu!</p>
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 24px 0; color: #3f3f46; font-size: 16px; line-height: 1.6;">Poštovani/a <strong>${name}</strong>,</p>
                      <p style="margin: 0 0 32px 0; color: #3f3f46; font-size: 16px; line-height: 1.6;">Primili smo vašu poruku i odgovorit ćemo vam u najkraćem mogućem roku.</p>
                      
                      <div style="background-color: #fafafa; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
                        <h2 style="margin: 0 0 16px 0; color: #18181b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">Vaša poruka</h2>
                        <p style="margin: 0; color: #3f3f46; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
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
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Došlo je do greške. Molimo pokušajte kasnije." },
      { status: 500 }
    );
  }
}
