import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { AuthCtx } from "./auth/AuthProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import Bookings from "./pages/Bookings";
import NotFound from "./pages/NotFound";
import AdminAddVehicle from "./pages/AdminAddVehicle";
import Transactions from "./pages/Transactions";
import PaymentGateway from "./pages/PaymentGateway";
import NavBar from "./components/NavBar";
import React from "react";
import "./index.css";  

function Private({ children }) {
  const { user } = React.useContext(AuthCtx);
  return user ? children : <Navigate to="/login" replace />;
}

function AdminOnly({ children }) {
  const { user } = React.useContext(AuthCtx);
  return user && user.role === "admin" ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />

          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />

          {/* mock payment -> booking */}
          <Route
            path="/payment"
            element={
              <Private>
                {" "}
                {/* user must be logged in */}
                <PaymentGateway />
              </Private>
            }
          />

          {/* admin‑only */}
          <Route
            path="/admin/vehicles"
            element={
              <AdminOnly>
                <AdminAddVehicle />
              </AdminOnly>
            }
          />
          <Route
            path="/transactions"
            element={
              <AdminOnly>
                <Transactions />
              </AdminOnly>
            }
          />

          <Route
            path="/bookings"
            element={
              <Private>
                <Bookings />
              </Private>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
