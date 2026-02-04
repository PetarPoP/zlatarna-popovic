import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/inquiries - Fetch all inquiries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get("unread") === "true";

    const where = unreadOnly ? { isRead: false } : {};

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, inquiries });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/inquiries - Mark inquiry as read/unread
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, isRead } = body;

    if (id === undefined || isRead === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing id or isRead" },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.update({
      where: { id: Number(id) },
      data: { isRead: Boolean(isRead) },
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/inquiries - Delete inquiry
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

    await prisma.inquiry.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
