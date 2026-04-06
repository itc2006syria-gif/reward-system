import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({
      notifications: []
    });
  } catch (error) {
    console.error("NOTIFICATIONS ERROR:", error);
    return NextResponse.json({ notifications: [] });
  }
}
