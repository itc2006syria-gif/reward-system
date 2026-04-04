import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, title, message } = await req.json();

    await Notification.create({
      userEmail: email,
      title,
      message,
    });

    return NextResponse.json({ message: "Notification created" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
