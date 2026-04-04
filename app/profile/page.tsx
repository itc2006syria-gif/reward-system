"use client";

import AuthGuard from "../components/AuthGuard";
import Sidebar from "../dashboard/Sidebar";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar />

        <div className="flex-1 p-10 space-y-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Profile
          </h1>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 max-w-xl">
            <ProfileField label="Name" value="Omar" />
            <ProfileField label="Email" value="omar@example.com" />
            <ProfileField label="Country" value="Germany" />
            <ProfileField label="Preferred Network" value="TRON (USDT-TRC20)" />

            <button className="mt-4 py-2 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition text-sm font-semibold">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

function ProfileField({ label, value }: any) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-gray-400 text-sm">{label}</span>
      <input
        defaultValue={value}
        className="px-4 py-2 bg-black/40 border border-white/10 rounded-xl focus:border-cyan-500 outline-none text-sm"
      />
    </div>
  );
}
