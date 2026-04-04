import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },

    balance: { type: Number, default: 0 },
    points: { type: Number, default: 0 },

    referralCode: { type: String },
    referredBy: { type: String, default: null },

    // Settings fields
    language: { type: String, default: "en" },
    theme: { type: String, default: "dark" },
    notifications: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
