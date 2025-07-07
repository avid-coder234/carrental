import React from "react";
import { useEffect, useState } from "react";
import api from "../api";
import { Flex, Heading } from "@radix-ui/themes";
import VehicleCard from "../components/VehicleCard";

export default function Vehicles() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/vehicles").then(res => setList(res.data));
  }, []);

  return (
    <Flex direction="column" gap="4" p="4">
      <Heading>Available Vehicles</Heading>
      <Flex gap="4" wrap="wrap">
        {list.map(v => (
          <VehicleCard key={v._id} v={v} />
        ))}
      </Flex>
    </Flex>
  );
}
