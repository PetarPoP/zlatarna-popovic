import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/stats - Fetch dashboard statistics
export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalAppointments,
      pendingAppointments,
      todayAppointments,
      totalInquiries,
      unreadInquiries,
      totalGalleryItems,
    ] = await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: "pending" } }),
      prisma.appointment.count({
        where: {
          appointmentDate: {
            gte: today,
            lt: tomorrow,
          },
        },
      }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { isRead: false } }),
      prisma.galleryItem.count(),
    ]);

    // Get recent appointments
    const recentAppointments = await prisma.appointment.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    // Get recent inquiries
    const recentInquiries = await prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      stats: {
        appointments: {
          total: totalAppointments,
          pending: pendingAppointments,
          today: todayAppointments,
        },
        inquiries: {
          total: totalInquiries,
          unread: unreadInquiries,
        },
        gallery: {
          total: totalGalleryItems,
        },
      },
      recent: {
        appointments: recentAppointments,
        inquiries: recentInquiries,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
