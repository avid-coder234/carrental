import React from "react";

import { useEffect, useState } from "react";
import { Heading, Flex, Text } from "@radix-ui/themes";
import api from "../api";
import BookingCard from "../components/BookingCard";

export default function Bookings() {
  const [list, setList] = useState([]);

  const refresh = () =>
    api.get("/bookings").then(res => setList(res.data));

  useEffect(refresh, []);

  const cancel = async id => {
    await api.delete(`/bookings/${id}`);
    refresh();
  };

  return (
    <Flex direction="column" gap="4" p="4">
      <Heading>My Bookings</Heading>
      {list.length === 0 && <Text>No bookings yet.</Text>}
      <Flex direction="column" gap="3">
        {list.map(b => (
          <BookingCard key={b._id} b={b} cancel={cancel} />
        ))}
      </Flex>
    </Flex>
  );
}
