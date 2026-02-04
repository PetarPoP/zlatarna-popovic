import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/gallery - Fetch all gallery items (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where = category ? { category } : {};

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        image: true,
        isAvailable: true,
      },
    });

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery items" },
      { status: 500 }
    );
  }
}
