// src/api/axios.js
import axios from "axios";
export default axios.create({
  baseURL: "https://carrental-7tiv.onrender.com/api",
  headers: { "Content-Type": "application/json" }
});
