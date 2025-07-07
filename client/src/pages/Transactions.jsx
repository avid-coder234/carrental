import { useContext, useEffect, useState } from "react";
import { AuthCtx } from "../auth/AuthProvider";
import api from "../api";
import { Flex, Heading, Text } from "@radix-ui/themes";
import BookingCard from "../components/BookingCard";
import TransactionsTable from "../components/TransactionsTable";
import { useNavigate } from "react-router-dom";

export default function Transactions() {
  const { user } = useContext(AuthCtx);
  const nav = useNavigate();
  const [list, setList] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") return nav("/");
    api
      .get("/bookings")
      .then((r) => setList(r.data))
      .catch(() => setErr("Could not load transactions"));
  }, [user, nav]);

  return (
    <Flex direction="column" gap="4" p="4">
      <Heading>All Transactions</Heading>
      {err && <Text color="red">{err}</Text>}
      {list.length === 0 ? (
        <Text>No transactions.</Text>
      ) : (
        <TransactionsTable rows={list} />
      )}
      
    </Flex>
  );
}
