import { NextResponse } from "next/server";

export async function POST() {
  try {
    // لاحقاً يمكنك جلب معاملات حقيقية من قاعدة البيانات
    return NextResponse.json({
      transactions: []
    });
  } catch (error) {
    console.error("TRANSACTIONS ERROR:", error);
    return NextResponse.json({ transactions: [] });
  }
}
