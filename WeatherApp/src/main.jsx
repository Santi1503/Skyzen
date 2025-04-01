import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registrado: ", registration);
      })
      .catch((error) => {
        console.error("Error al registrar el SW:", error);
      });
  });
}

createRoot(document.getElementById("root")).render(<App />);
