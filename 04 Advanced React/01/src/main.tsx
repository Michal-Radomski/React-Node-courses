import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./lib/global.css";
import "./lib/Button.css";
import "./lib/Margin.css";
import "./lib/Select.css";
import "./lib/Text.css";
import "./lib/Utilities.css";

createRoot(document.getElementById("root") as HTMLDivElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
