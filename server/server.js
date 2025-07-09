// // server.js
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import authRoutes from "./routes/auth.js";
// import vehicleRoutes from "./routes/vehicles.js";
// import bookingRoutes from "./routes/bookings.js";

// dotenv.config();
// const app = express();
// const MONGO_URI = process.env.MONGO;

// // middle‑ware
// app.use(cors({
//   origin: 'https://carrental-beige.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));

// app.use(express.json());

// // routes
// app.use("/api/auth", authRoutes);
// app.use("/api/vehicles", vehicleRoutes);
// app.use("/api/bookings", bookingRoutes);

// // boot
// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     app.listen(4000, () =>
//       console.log(`Server running @ https://carrental-7tiv.onrender.com/api`)
//     );
//   })
//   .catch(err => console.error(err));


// // server.js or index.js
// import bcrypt from 'bcrypt';
// import User from './models/User.js'; // Ensure this file is also an ES module

// // Connect to MongoDB
// await mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// async function ensureAdminExists() {
//   const existing = await User.findOne({ email: 'admin@gmail.com' });
//   if (existing) {
//     console.log('👤 Admin user already exists.');
//     return;
//   }

//   const hashedPassword = await bcrypt.hash('admin123', 10);

//   await User.create({
//     name: 'Admin',
//     email: 'admin@gmail.com',
//     password: hashedPassword,
//     role: 'admin',
//   });

//   console.log('✅ Admin user seeded on startup.');
// }



// await ensureAdminExists();

// server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import authRoutes from "./routes/auth.js";
import vehicleRoutes from "./routes/vehicles.js";
import bookingRoutes from "./routes/bookings.js";
import User from "./models/User.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO;

// --- CORS CONFIGURATION ---
const allowedOrigins = [
  "https://carrental-7tiv.onrender.com/api",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// --- MIDDLEWARE ---
app.use(express.json());

// --- ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

// --- ADMIN SEEDING ---
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

// --- DATABASE CONNECTION + SERVER BOOT ---
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("✅ MongoDB connected");
  await ensureAdminExists();
  app.listen(PORT, () =>
    console.log(`🚀 Server running at https://carrental-7tiv.onrender.com/api`)
  );
})
.catch(err => console.error("❌ DB connection error:", err));


