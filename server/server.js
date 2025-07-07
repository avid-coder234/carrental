// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import vehicleRoutes from "./routes/vehicles.js";
import bookingRoutes from "./routes/bookings.js";

dotenv.config();
const app = express();
const MONGO_URI = process.env.MONGO;

// middle‑ware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

// boot
mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(4000, () =>
      console.log(`Server running @ http://localhost:4000`)
    );
  })
  .catch(err => console.error(err));


// server.js or index.js
import bcrypt from 'bcrypt';
import User from './models/User.js'; // Ensure this file is also an ES module

// Connect to MongoDB
await mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function ensureAdminExists() {
  const existing = await User.findOne({ email: 'admin@gmail.com' });
  if (existing) {
    console.log('👤 Admin user already exists.');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await User.create({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: hashedPassword,
    role: 'admin',
  });

  console.log('✅ Admin user seeded on startup.');
}

await ensureAdminExists();