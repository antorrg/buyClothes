import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { AuthProvider } from "./Auth/AuthContext.jsx";
import store from "./Redux/store.js";
import { HelmetProvider } from "react-helmet-async";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ReduxProvider>
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
