import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/gallery - Fetch all gallery items
export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
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

// POST /api/admin/gallery - Create new gallery item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, image, sortOrder, isAvailable } = body;

    if (!title || !description || !category || !image) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const item = await prisma.galleryItem.create({
      data: {
        title,
        description,
        category,
        image,
        sortOrder: sortOrder ?? 0,
        isAvailable: isAvailable ?? true,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create gallery item" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/gallery - Update gallery item
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, category, image, sortOrder, isAvailable } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id" },
        { status: 400 }
      );
    }

    const data: Record<string, unknown> = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (category !== undefined) data.category = category;
    if (image !== undefined) data.image = image;
    if (sortOrder !== undefined) data.sortOrder = sortOrder;
    if (isAvailable !== undefined) data.isAvailable = isAvailable;

    const item = await prisma.galleryItem.update({
      where: { id: Number(id) },
      data,
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error("Error updating gallery item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update gallery item" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/gallery - Delete gallery item
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

    await prisma.galleryItem.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete gallery item" },
      { status: 500 }
    );
  }
}
