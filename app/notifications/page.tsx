"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.email) return;

    fetch("/api/notifications/list", {
      method: "POST",
      body: JSON.stringify({ email: user.email }),
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data.notifications || []));
  }, []);

  return (
    <AuthGuard>
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold">Notifications</h1>

        {notifications.length === 0 && (
          <p className="text-gray-400">No notifications found.</p>
        )}

        <ul className="space-y-2">
          {notifications.map((n: any, i: number) => (
            <li
              key={i}
              className="bg-white/5 border border-white/10 p-3 rounded-lg"
            >
              {n.message}
            </li>
          ))}
        </ul>
      </div>
    </AuthGuard>
  );
}
