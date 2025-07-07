import { useState, useContext, useEffect } from "react";
import { AuthCtx } from "../auth/AuthProvider";
import api from "../api";
import { Flex, Heading, TextField, Button, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

export default function AdminAddVehicle() {
  const { user } = useContext(AuthCtx);
  const nav = useNavigate();

  // kick non‑admins out
  useEffect(() => {
    if (!user || user.role !== "admin") nav("/");
  }, [user, nav]);

  const [f, setF] = useState({
    brand: "",
    model: "",
    year: "",
    seats: "",
    pricePerDay: "",
    imageUrl: ""
  });
  const [msg, setMsg] = useState("");

  const h = (e) => setF({ ...f, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/vehicles", {
        ...f,
        year: Number(f.year),
        seats: Number(f.seats),
        pricePerDay: Number(f.pricePerDay)
      });
      setMsg("Vehicle added!");
      setF({ brand: "", model: "", year: "", seats: "", pricePerDay: "", imageUrl: "" });
    } catch {
      setMsg("Error adding vehicle");
    }
  };

  return (
    <Flex direction="column" gap="4" p="4" maxWidth="500px">
      <Heading>Add Vehicle</Heading>
      {msg && <Text color={msg.startsWith("Error") ? "red" : "green"}>{msg}</Text>}

      <form onSubmit={submit}>
        <Flex direction="column" gap="3">
          {["brand", "model", "year", "seats", "pricePerDay", "imageUrl"].map((k) => (
            <TextField.Root
              key={k}
              placeholder={k.replace(/([A-Z])/g, " $1")}
              name={k}
              value={f[k]}
              onChange={h}
              required
              type={["year", "seats", "pricePerDay"].includes(k) ? "number" : "text"}
            />
          ))}
          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </Flex>
  );
}
