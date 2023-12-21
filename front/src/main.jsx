import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SnackBarProvider } from "./context/SnackBarContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackBarProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SnackBarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
