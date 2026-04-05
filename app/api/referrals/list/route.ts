import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ referrals: [] });
    }

    // إذا كان لديك نظام إحالات مستقبلاً، عدّل هنا
    return NextResponse.json({
      referrals: user.referrals || []
    });

  } catch (error) {
    console.error("REFERRALS ERROR:", error);
    return NextResponse.json({ referrals: [] });
  }
}
