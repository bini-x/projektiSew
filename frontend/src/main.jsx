import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Perdoruesi from "./PerdoruesiContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Perdoruesi.Provider>
      <App />
    </Perdoruesi.Provider>
  </StrictMode>,
);
