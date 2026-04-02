"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AuthGuard from "../components/AuthGuard";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setName(parsed.name);
      setEmail(parsed.email);
    }
  }, []);

  const saveChanges = () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    const updatedUser = { name, email, password: user.password };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    alert("Profile updated successfully");
  };

  return (
    <AuthGuard>
      <div className="flex">
        <Sidebar />

        <div className="ml-64 w-full p-10 text-white">
          <h1 className="text-3xl font-bold mb-6">Profile</h1>

          <div className="bg-[#111] border border-[#333] p-8 rounded-lg w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-6">Account Information</h2>

            {/* Name */}
            <div className="flex flex-col mb-4">
              <label className="text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                className="p-3 rounded-lg bg-[#1a1a1a] border border-[#333] text-white focus:border-cyan-400 outline-none"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Save Button */}
            <button
              onClick={saveChanges}
              className="mt-4 bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-3 rounded-lg transition w-full"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
