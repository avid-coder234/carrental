import React from "react";
import ReactDOM from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import App from "./App";
import "./index.css";    

ReactDOM.createRoot(document.getElementById("root")).render(
  <Theme accentColor="crimson" radius="medium">
    <App />
  </Theme>
);
