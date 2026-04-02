"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: any) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // حفظ بيانات المستخدم
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    // تسجيل الدخول تلقائيًا
    localStorage.setItem("isLoggedIn", "true");

    // تحويل المستخدم للداشبورد
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-white">
      <div className="bg-[#111] border border-[#333] p-8 rounded-lg w-96">
        <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-gray-400 text-center mb-6">
          Join the Reward System today
        </p>

        <form onSubmit={handleRegister}>

          {/* Name */}
          <div className="flex flex-col mb-4">
            <label className="text-gray-300 mb-1">Full Name</label>
            <input
              type="text"
              className="p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-cyan-400 outline-none"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col mb-4">
            <label className="text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-cyan-400 outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col mb-4">
            <label className="text-gray-300 mb-1">Password</label>
            <input
              type="password"
              className="p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-cyan-400 outline-none"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="mt-4 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-3 rounded-lg transition w-full"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-gray-400 text-center mt-6">
            Already have an account{" "}
            <a href="/login" className="text-cyan-400 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
