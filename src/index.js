import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TranslateContextProvider } from "./services/translationContext/translation.context";
import { AuthenticationContextProvider } from "./services/authenticationContext/authentication.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TranslateContextProvider>
    <AuthenticationContextProvider>
      <App />
    </AuthenticationContextProvider>
  </TranslateContextProvider>
);
