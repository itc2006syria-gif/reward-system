import { NextResponse } from "next/server";

export async function POST() {
  try {
    // لاحقاً يمكنك إضافة نظام إشعارات حقيقي
    return NextResponse.json({
      notifications: []
    });
  } catch (error) {
    console.error("NOTIFICATIONS ERROR:", error);
    return NextResponse.json({ notifications: [] });
  }
}
