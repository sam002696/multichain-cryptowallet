// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { SessionProvider } from "./context/SessionContext.jsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoadingProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </LoadingProvider>
  </BrowserRouter>
);
