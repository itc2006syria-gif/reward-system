"use client";

import Link from "next/link";
import { Gift, Wallet, BarChart3, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* Hero Section */}
      <section className="pt-32 pb-24 text-center px-6 bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        <h1 className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Web3 Rewards Platform
        </h1>

        <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10">
          منصة مكافآت يومية مبنية على تقنيات Web3 — احصل على USDT، تتبّع معاملاتك، 
          واستمتع بتجربة آمنة وسلسة.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="px-10 py-4 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition text-lg"
          >
            ابدأ الآن
          </Link>

          <Link
            href="/dashboard"
            className="px-10 py-4 border border-gray-600 rounded-lg hover:bg-gray-800 transition text-lg"
          >
            لوحة التحكم
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div className="bg-[#111] border border-[#333] p-10 rounded-xl text-center hover:border-cyan-400 transition">
          <Gift className="mx-auto text-cyan-400 mb-4" size={50} />
          <h3 className="text-2xl font-semibold mb-3">مكافآت يومية</h3>
          <p className="text-gray-400">
            احصل على مكافآت USDT يوميًا مع نظام Streak ذكي يحفّزك على الاستمرار.
          </p>
        </div>

        <div className="bg-[#111] border border-[#333] p-10 rounded-xl text-center hover:border-purple-400 transition">
          <Wallet className="mx-auto text-purple-400 mb-4" size={50} />
          <h3 className="text-2xl font-semibold mb-3">محفظة آمنة</h3>
          <p className="text-gray-400">
            تتبّع رصيدك ومعاملاتك بسهولة مع أعلى معايير الأمان.
          </p>
        </div>

        <div className="bg-[#111] border border-[#333] p-10 rounded-xl text-center hover:border-green-400 transition">
          <BarChart3 className="mx-auto text-green-400 mb-4" size={50} />
          <h3 className="text-2xl font-semibold mb-3">تحليلات متقدمة</h3>
          <p className="text-gray-400">
            رسوم بيانية احترافية تعرض نشاطك وتطور أرباحك.
          </p>
        </div>

      </section>

      {/* Why Us */}
      <section className="px-6 py-24 bg-[#0d0d0d] border-t border-[#222]">
        <h2 className="text-4xl font-bold text-center mb-12">
          لماذا منصتنا؟
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          
          <div className="bg-[#111] border border-[#333] p-8 rounded-xl">
            <Shield className="text-cyan-400 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">أمان عالي</h3>
            <p className="text-gray-400">
              نظام حماية متقدم يحافظ على بياناتك وأموالك.
            </p>
          </div>

          <div className="bg-[#111] border border-[#333] p-8 rounded-xl">
            <Gift className="text-purple-400 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-2">مكافآت حقيقية</h3>
            <p className="text-gray-400">
              مكافآت USDT حقيقية تُضاف مباشرة إلى محفظتك.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">
          جاهز تبدأ رحلتك؟
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          انضم الآن وابدأ في جمع المكافآت اليومية.
        </p>

        <Link
          href="/register"
          className="px-12 py-4 bg-purple-600 hover:bg-purple-500 transition rounded-lg text-lg font-semibold"
        >
          إنشاء حساب
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 border-t border-[#222]">
        © {new Date().getFullYear()} Reward System — All Rights Reserved.
      </footer>

    </div>
  );
}
