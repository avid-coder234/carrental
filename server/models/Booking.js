// models/Booking.js
import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
    startDate: Date,
    endDate: Date,
    totalCost: Number,
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" }
  },
  { timestamps: true }
);
export default mongoose.model("Booking", bookingSchema);
