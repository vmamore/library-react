import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import KeycloakService from "./keycloak";
import "bootstrap/dist/css/bootstrap.min.css";

const eventLogger = (event, error) => {
  console.log("onKeycloakEvent", event, error);
};

const tokenLogger = (tokens) => {
  console.log("onKeycloakTokens", tokens);
};

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={KeycloakService.keycloak}
      onEvent={eventLogger}
      onTokens={tokenLogger}
      initOptions={KeycloakService.initOptions}
    >
      <App />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
