import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import BikesProvider from "./store/BikesProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BikesProvider>
    <App />
  </BikesProvider>
);
