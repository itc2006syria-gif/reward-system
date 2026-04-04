import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password, ref } = await req.json();

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const referralCode = email.split("@")[0] + "-" + Math.floor(Math.random() * 99999);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
      balance: 0,
      points: 0,
      referralCode,
      referredBy: ref || null,
    });

    // If user was referred, reward the referrer
    if (ref) {
      const referrer = await User.findOne({ referralCode: ref });
      if (referrer) {
        referrer.balance += 5; // reward
        referrer.points += 20;
        await referrer.save();
      }
    }

    return NextResponse.json({ message: "User registered", user: newUser });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
