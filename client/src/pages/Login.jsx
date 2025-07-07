// src/pages/Login.jsx
import { useState, useContext } from "react";
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
import { AuthCtx } from "../auth/AuthProvider";
import api from "../api";

export default function Login() {
  const nav = useNavigate();
  const { login } = useContext(AuthCtx);
  const [email, setE] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data.token);
      nav("/vehicles");
    } catch (ex) {
      setErr(ex.response?.data?.message || "Login failed");
    }
  };

  return (
    /* hero section */
    <Flex
      align="center"
      justify="center"
      minHeight="100vh"
      style={{
        background:
          "linear-gradient(135deg,#f5f7fa 0%,#c3cfe2 100%)" /* subtle SaaS gradient */
      }}
    >
      {/* auth card */}
      <Card
        size="4"
        style={{
          width: 360,
          boxShadow:
            "0 10px 25px rgba(0,0,0,0.08),0 3px 8px rgba(0,0,0,0.04)"
        }}
      >
        <Flex direction="column" gap="6" align="center">
          {/* logo / brand */}
          

          <Heading size="6">Log in to your account</Heading>

          {err && (
            <Text color="red" align="center" size="2">
              {err}
            </Text>
          )}

          <form onSubmit={submit} style={{ width: "100%" }}>
            <Flex direction="column" gap="4">
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
                Enter
              </Button>
            </Flex>
          </form>

          {/* footer link */}
          <Text size="2" color="gray">
            New here?{" "}
            <RLink asChild weight="bold" underline="hover">
              <Link to="/register">Create an account →</Link>
            </RLink>
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
}
