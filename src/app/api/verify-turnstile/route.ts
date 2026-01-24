import { NextResponse } from "next/server";

type TurnstileResponse = {
  success: boolean;
  "error-codes"?: string[];
};

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token is required" },
        { status: 400 }
      );
    }

    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (!secretKey) {
      console.error("TURNSTILE_SECRET_KEY is not configured");
      return NextResponse.json(
        { success: false, error: "Server configuration error" },
        { status: 500 }
      );
    }

    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        body: formData,
      }
    );

    const data: TurnstileResponse = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Verification failed", codes: data["error-codes"] },
      { status: 400 }
    );
  } catch (error) {
    console.error("Turnstile verification error:", error);
    return NextResponse.json(
      { success: false, error: "Verification failed" },
      { status: 500 }
    );
  }
}
