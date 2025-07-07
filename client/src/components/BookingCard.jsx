import React from "react";

import { Card, Flex, Text, Button, Badge } from "@radix-ui/themes";
import dayjs from "dayjs";

export default function BookingCard({ b, cancel }) {
  const { vehicleId: v } = b;
  return (
    <Card>
      <Flex align="center" justify="between">
        <Flex direction="column" gap="1">
          <Text weight="bold">
            {v.brand} {v.model}
          </Text>
          <Text size="2">
            {dayjs(b.startDate).format("DD MMM")} →{" "}
            {dayjs(b.endDate).format("DD MMM YYYY")}
          </Text>
          <Text size="2" color="crimson">
            ₹{b.totalCost}
          </Text>
          {b.status === "confirmed" ? <Badge color="green">Booked</Badge> : <Badge color="amber">{b.status}</Badge>}
        </Flex>
        <Button variant="surface" color="red" onClick={() => cancel(b._id)}>
          Cancel
        </Button>
      </Flex>
    </Card>
  );
}
