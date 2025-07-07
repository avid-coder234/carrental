// models/Vehicle.js
import mongoose from "mongoose";
const vehicleSchema = new mongoose.Schema(
  {
    brand: String,
    model: String,
    year: Number,
    seats: Number,
    pricePerDay: Number,
    imageUrl: String,
    available: { type: Boolean, default: true }
  },
  { timestamps: true }
);
export default mongoose.model("Vehicle", vehicleSchema);
