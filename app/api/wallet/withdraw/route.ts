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

    if (user.balance < amount) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    user.balance -= amount;
    await user.save();

    await Transaction.create({
      userEmail: email,
      type: "withdraw",
      amount,
    });

    return NextResponse.json({
      message: "Withdrawal successful",
      balance: user.balance,
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
