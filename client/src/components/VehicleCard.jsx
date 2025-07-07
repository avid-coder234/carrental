import React from "react";

import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export default function VehicleCard({ v }) {
  return (
    <Card style={{ width: 260 }}>
      <img src={v.imageUrl} alt={v.model} width="100%" height="140" style={{ objectFit: "cover" }} />
      <Flex direction="column" gap="1" mt="2">
        <Text weight="bold">
          {v.brand} {v.model}
        </Text>
        <Text size="2">{v.year} · {v.seats} seats</Text>
        <Text size="2" color="crimson">₹{v.pricePerDay}/day</Text>
        <Button mt="2" asChild>
          <Link to={`/vehicles/${v._id}`}>View & Book</Link>
        </Button>
      </Flex>
    </Card>
  );
}
