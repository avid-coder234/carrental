// models/User.js
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,              // hashed with bcrypt
    role: { type: String, default: "customer", enum: ["customer", "admin"] }
  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);
