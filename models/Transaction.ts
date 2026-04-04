import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userEmail: String,
    type: String, // deposit, withdraw, reward, referral
    amount: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
