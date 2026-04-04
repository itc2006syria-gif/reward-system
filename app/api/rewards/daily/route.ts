import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const now = Date.now();
    const lastClaim = user.lastDailyClaim || 0;

    // 24 hours = 86400000 ms
    if (now - lastClaim < 86400000) {
      return NextResponse.json({ error: "Already claimed today" }, { status: 400 });
    }

    // Add reward
    user.balance += 5;
    user.points += 10;
    user.lastDailyClaim = now;

    await user.save();

    return NextResponse.json({
      message: "Daily reward claimed",
      balance: user.balance,
      points: user.points,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
