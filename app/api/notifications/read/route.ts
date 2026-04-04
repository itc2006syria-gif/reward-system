import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function POST(req: Request) {
  await connectDB();

  const { email } = await req.json();

  const notifications = await Notification.find({ userEmail: email }).sort({
    createdAt: -1,
  });

  return NextResponse.json({ notifications });
}
