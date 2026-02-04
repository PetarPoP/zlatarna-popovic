import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/gallery/[id] - Fetch single gallery item (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const item = await prisma.galleryItem.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        image: true,
      },
    });

    if (!item) {
      return NextResponse.json(
        { success: false, error: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Error fetching gallery item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch gallery item" },
      { status: 500 }
    );
  }
}
