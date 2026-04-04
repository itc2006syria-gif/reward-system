"use client";

import { useEffect, useState } from "react";
import AuthGuard from "../components/AuthGuard";
import Sidebar from "../dashboard/Sidebar";

export default function NotificationsPage() {
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    const u = JSON.parse(stored);
    setUser(u);

    fetch("/api/notifications/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: u.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.notifications) setNotifications(data.notifications);
      });
  }, []);

  async function markAsRead(id: string) {
    await fetch("/api/notifications/read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
  }

  if (!user) return null;

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-black text-white">
        <Sidebar />

        <div className="flex-1 p-10 space-y-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Notifications
          </h1>

          {notifications.length === 0 ? (
            <p className="text-gray-400">No notifications found.</p>
          ) : (
            <div className="space-y-4">
              {notifications.map((n, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${
                    n.read
                      ? "bg-white/5 border-white/10"
                      : "bg-purple-600/20 border-purple-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold">{n.title}</h2>

                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n._id)}
                        className="text-sm text-cyan-400 hover:underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>

                  <p className="text-gray-300 mt-1">{n.message}</p>

                  <p className="text-gray-500 text-xs mt-2">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
