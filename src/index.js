import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import "bootstrap/dist/css/bootstrap.min.css";

const eventLogger = (event, error) => {
  console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens) => {
  console.log("onKeycloakTokens", tokens);
};

const keyCloakInitOptions = {
  onLoad: "login-required",
  silentCheckSsoRedirectUri:
    window.location.origin + "/silent-check-sso.html",
  pkceMethod: 'S256',
}

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={eventLogger}
      onTokens={tokenLogger}
      initOptions={keyCloakInitOptions}
    >
      <App />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
