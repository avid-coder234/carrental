import React from "react";

import { Flex, Text, Button } from "@radix-ui/themes";
import { Link, useNavigate } from "react-router-dom";
import { AuthCtx } from "../auth/AuthProvider";

export default function NavBar() {
  const { user, logout } = React.useContext(AuthCtx);
  const nav = useNavigate();

  return (
    <Flex
      px="4"
      py="3"
      align="center"
      justify="between"
      style={{ borderBottom: "1px solid #eee" }}
    >
      <Text weight="bold" size="5" asChild>
        <Link to="/">🚗 CarRent</Link>
      </Text>

      <Flex gap="3" align="center">
        <Link to="/vehicles">Vehicles</Link>
        {user && <Link to="/bookings">My Bookings</Link>}

        {/* admin‑only links */}
        {user?.role === "admin" && (
          <>
            <Link to="/admin/vehicles">Add Vehicle</Link>
            <Link to="/transactions">Transactions</Link>
          </>
        )}

        {user ? (
          <Button
            size="2"
            variant="surface"
            onClick={() => {
              logout();
              nav("/");
            }}
          >
            Log out
          </Button>
        ) : (
          <Button size="2" onClick={() => nav("/login")}>
            Log in
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
