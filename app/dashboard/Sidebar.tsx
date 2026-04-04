"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({ notifications = 0 }: any) {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center justify-between px-4 py-3 rounded-xl transition ${
      pathname === path
        ? "bg-white/10 text-white"
        : "text-gray-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <div className="w-64 min-h-screen bg-black/40 border-r border-white/10 p-6 space-y-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
        Dashboard
      </h1>

      <nav className="space-y-2">

        <Link href="/dashboard" className={linkClass("/dashboard")}>
          <span>Home</span>
        </Link>

        <Link href="/wallet" className={linkClass("/wallet")}>
          <span>Wallet</span>
        </Link>

        <Link href="/transactions" className={linkClass("/transactions")}>
          <span>Transactions</span>
        </Link>

        <Link href="/referral" className={linkClass("/referral")}>
          <span>Referral</span>
        </Link>

        <Link href="/rewards" className={linkClass("/rewards")}>
          <span>Daily Rewards</span>
        </Link>

        <Link href="/notifications" className={linkClass("/notifications")}>
          <span>Notifications</span>

          {notifications > 0 && (
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
              {notifications}
            </span>
          )}
        </Link>

        <Link href="/settings" className={linkClass("/settings")}>
          <span>Settings</span>
        </Link>

        <Link href="/logout" className={linkClass("/logout")}>
          <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
}

