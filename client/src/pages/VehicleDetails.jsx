import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import api from "../api";
import { AuthCtx } from "../auth/AuthProvider";
import { Flex, Button, TextField, Heading, Text } from "@radix-ui/themes";

export default function VehicleDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useContext(AuthCtx);
  const [v, setV] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get(`/vehicles/${id}`).then(r => setV(r.data));
  }, [id]);

  const book = async () => {
    if (!user) return nav("/login");
    try {
      await api.post("/bookings", { vehicleId: id, startDate: start, endDate: end });
      nav("/bookings");
    } catch (e) {
      setMsg(e.response?.data?.message || "Could not book");
    }
  };

  const goToPay = () => {
    if (!user) return nav("/login");
    if (!start || !end) return setMsg("Pick dates first");
    nav("/payment", {
      state: {
        vehicle: v,
        startDate: start,
        endDate: end
      }
    });
  };

  if (!v) return "Loading…";

  return (
    <Flex direction="column" gap="4" p="4" maxWidth="600px" mx="auto">
      <Heading size="6">{v.brand} {v.model}</Heading>
      <img src={v.imageUrl} alt={v.model} width="100%" style={{ borderRadius: 8 }} />
      <Text>₹{v.pricePerDay} per day • {v.seats} seats • {v.year}</Text>

      <Flex gap="3">
        <TextField.Root type="date" value={start} onChange={e => setStart(e.target.value)} />
        <TextField.Root type="date" value={end} onChange={e => setEnd(e.target.value)} />
        <Button onClick={goToPay}>Book</Button>
      </Flex>
      {msg && <Text color="red">{msg}</Text>}
    </Flex>
  );
}
