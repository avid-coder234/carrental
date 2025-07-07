// routes/vehicles.js
import express from "express";
import Vehicle from "../models/Vehicle.js";
import { protect, adminOnly } from "../middleware/auth.js";
const router = express.Router();

// PUBLIC
router.get("/", async (_, res) => res.json(await Vehicle.find()));
router.get("/:id", async (req, res) => res.json(await Vehicle.findById(req.params.id)));

// ADMIN
router.post("/", protect, adminOnly, async (req, res) => res.json(await Vehicle.create(req.body)));
router.put("/:id", protect, adminOnly, async (req, res) =>
  res.json(await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true }))
);
router.delete("/:id", protect, adminOnly, async (req, res) =>
  res.json(await Vehicle.findByIdAndDelete(req.params.id))
);

export default router;
