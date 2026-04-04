import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Transaction from "@/models/Transaction";

export async function POST(req: Request) {
  await connectDB();

  const { email } = await req.json();

  const transactions = await Transaction.find({ userEmail: email }).sort({
    createdAt: -1,
  });

  return NextResponse.json({ transactions });
}
