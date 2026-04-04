import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Transaction from "@/models/Transaction";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, amount } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.balance += amount;
    await user.save();

    await Transaction.create({
      userEmail: email,
      type: "deposit",
      amount,
    });

    return NextResponse.json({
      message: "Deposit successful",
      balance: user.balance,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
