// src/pages/SignUp.jsx
import { useState } from "react";
import {
  Flex,
  Card,
  TextField,
  Button,
  Heading,
  Text,
  Link as RLink
} from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function SignUp() {
  const nav = useNavigate();
  const [name, setN] = useState("");
  const [email, setE] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      setMsg("Account created! Redirecting to log in…");
      setTimeout(() => nav("/login"), 1200);
    } catch (ex) {
      setErr(ex.response?.data?.message || "Could not register");
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      minHeight="100vh"
      style={{
        background: "linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%)"
      }}
    >
      <Card
        size="4"
        style={{
          width: 380,
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08),0 3px 8px rgba(0,0,0,0.04)"
        }}
      >
        <Flex direction="column" gap="6" align="center">
          

          <Heading size="6">Create your account</Heading>

          {err && (
            <Text color="red" align="center" size="2">
              {err}
            </Text>
          )}
          {msg && (
            <Text color="green" align="center" size="2">
              {msg}
            </Text>
          )}

          <form onSubmit={submit} style={{ width: "100%" }}>
            <Flex direction="column" gap="4">
              <TextField.Root
                placeholder="Full name"
                value={name}
                onChange={e => setN(e.target.value)}
                required
              />
              <TextField.Root
                placeholder="Email"
                type="email"
                value={email}
                onChange={e => setE(e.target.value)}
                required
              />
              <TextField.Root
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setP(e.target.value)}
                required
              />
              <Button type="submit" size="3">
                Sign up
              </Button>
            </Flex>
          </form>

          <Text size="2" color="gray">
            Already have an account?{" "}
            <RLink asChild weight="bold" underline="hover">
              <Link to="/login">Log in →</Link>
            </RLink>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
