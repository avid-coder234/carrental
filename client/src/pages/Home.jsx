import React from "react";
import { Flex, Heading, Text, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Flex direction="column" align="center" gap="4" mt="7">
      <Heading size="8">Rent the perfect ride.</Heading>
      <Text size="4" color="gray">
        Browse real‑time availability and book in seconds.
      </Text>
      <Button size="4" asChild>
        <Link to="/vehicles">Browse Vehicles</Link>
      </Button>
    </Flex>
  );
}
