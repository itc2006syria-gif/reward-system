"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Gift,
  Wallet,
  List,
  User,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${
      pathname === path
        ? "bg-cyan-500 text-black font-semibold"
        : "text-gray-300 hover:bg-[#222]"
    }`;

  const logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    router.push("/login");
  };

  return (
    <div className="h-screen w-64 bg-[#0d0d0d] border-r border-[#222] p-6 flex flex-col justify-between fixed left-0 top-0">
      <div>
        <h1 className="text-2xl font-bold text-white mb-8">Reward System</h1>

        <div className="flex flex-col gap-2">
          <div onClick={() => router.push("/dashboard")} className={linkClass("/dashboard")}>
            <LayoutDashboard size={20} />
            Dashboard
          </div>

          <div onClick={() => router.push("/rewards")} className={linkClass("/rewards")}>
            <Gift size={20} />
            Rewards
          </div>

          <div onClick={() => router.push("/wallet")} className={linkClass("/wallet")}>
            <Wallet size={20} />
            Wallet
          </div>

          <div onClick={() => router.push("/transactions")} className={linkClass("/transactions")}>
            <List size={20} />
            Transactions
          </div>

          <div onClick={() => router.push("/profile")} className={linkClass("/profile")}>
            <User size={20} />
            Profile
          </div>
        </div>
      </div>

      <div
        onClick={logout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-red-400 hover:bg-[#222] transition"
      >
        <LogOut size={20} />
        Logout
      </div>
    </div>
  );
}
