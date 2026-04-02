"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AuthGuard from "../components/AuthGuard";

export default function SettingsPage() {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedNotifications = localStorage.getItem("notifications");
    const savedSounds = localStorage.getItem("sounds");

    if (savedTheme) setTheme(savedTheme);
    if (savedNotifications) setNotifications(savedNotifications === "true");
    if (savedSounds) setSounds(savedSounds === "true");
  }, []);

  const saveSettings = () => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("notifications", notifications.toString());
    localStorage.setItem("sounds", sounds.toString());

    alert("Settings saved successfully");
  };

  return (
    <AuthGuard>
      <div className="flex">
        <Sidebar />

        <div className="ml-64 w-full p-10 text-white">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>

          <div className="bg-[#111] border border-[#333] p-8 rounded-lg max-w-xl">

            {/* Theme */}
            <div className="mb-6">
              <label className="text-gray-300 font-semibold">Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="mt-2 p-3 w-full rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-cyan-400 outline-none"
              >
                <option value="dark">Dark Mode</option>
                <option value="light">Light Mode</option>
              </select>
            </div>

            {/* Notifications */}
            <div className="mb-6 flex items-center justify-between">
              <label className="text-gray-300 font-semibold">Notifications</label>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            {/* Sounds */}
            <div className="mb-6 flex items-center justify-between">
              <label className="text-gray-300 font-semibold">Sound Effects</label>
              <input
                type="checkbox"
                checked={sounds}
                onChange={() => setSounds(!sounds)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={saveSettings}
              className="mt-4 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-3 rounded-lg transition w-full"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
