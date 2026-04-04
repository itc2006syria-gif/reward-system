"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../components/AuthGuard";
import Sidebar from "../dashboard/Sidebar";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const u = JSON.parse(stored);
    setUser(u);
    setName(u.name || "");
  }, []);

  async function saveSettings() {
    if (!user) return;

    setLoading(true);

    const res = await fetch("/api/settings/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        name,
        language,
        theme,
        notifications,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      alert(data.error);
      return;
    }

    const updated = { ...user, name };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);

    alert("Settings updated successfully");
  }

  if (!user) return null;

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar />

        <div className="flex-1 p-10 space-y-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Settings
          </h1>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-xl space-y-6">

            <div>
              <p className="text-gray-400 text-sm mb-1">Full Name</p>
              <input
                type="text"
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-1">Language</p>
              <select
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
                <option value="de">German</option>
              </select>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-1">Theme</p>
              <select
                className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-xl"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <p className="text-gray-300">Enable Notifications</p>
            </div>

            <button
              onClick={saveSettings}
              disabled={loading}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition font-semibold"
            >
              {loading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
