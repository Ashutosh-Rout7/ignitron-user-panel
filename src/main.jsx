import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// main.jsx
import "./styles.css";

import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./lib/app-store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);