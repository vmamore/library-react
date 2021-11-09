import React from "react";
import ReactDOM from "react-dom";
import { AppRouter } from "./App";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import KeycloakService from "./keycloak";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <ReactKeycloakProvider
      authClient={KeycloakService.keycloak}
    >
      <AppRouter />
    </ReactKeycloakProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
