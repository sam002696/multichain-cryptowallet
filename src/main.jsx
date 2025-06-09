// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";
import { SessionProvider } from "./context/SessionContext.jsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <LoadingProvider>
        <SessionProvider>
          <App />
        </SessionProvider>
      </LoadingProvider>
    </Provider>
  </BrowserRouter>
);
