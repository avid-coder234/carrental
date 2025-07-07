import { Flex, Heading, Button } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import React from "react";

export default function NotFound() {
  return (
    <Flex direction="column" align="center" gap="3" mt="7">
      <Heading size="8">404</Heading>
      <Heading size="4">Nothing here</Heading>
      <Button asChild><Link to="/">Go home</Link></Button>
    </Flex>
  );
}
