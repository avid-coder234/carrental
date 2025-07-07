// routes/bookings.js
import express from "express";
import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();

router.get("/", protect, async (req, res) => {
  const filter = req.user.role === "admin" ? {} : { userId: req.user._id };
  const bookings = await Booking.find(filter).populate("vehicleId");
  res.json(bookings);
});

router.post("/", protect, async (req, res) => {
  const { vehicleId, startDate, endDate, status = "pending" } = req.body;
  const vehicle = await Vehicle.findById(vehicleId);
  const days = (new Date(endDate) - new Date(startDate)) / 86400000 + 1;
  const booking = await Booking.create({
    userId: req.user._id,
    vehicleId,
    startDate,
    endDate,
    totalCost: days * vehicle.pricePerDay,
    status,
  });
  res.json(booking);
});

router.delete("/:id", protect, async (req, res) =>
  res.json(await Booking.findByIdAndDelete(req.params.id))
);

export default router;
