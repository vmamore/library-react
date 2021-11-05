import Keycloak from 'keycloak-js';

const initOptions = {
  onLoad: "login-required",
  silentCheckSsoRedirectUri:
    window.location.origin + "/silent-check-sso.html",
  pkceMethod: 'S256',
}

const keycloak = Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'library',
  clientId: 'library-api'
});

const KeycloakService = {
  keycloak,
  initOptions
}
export default KeycloakService;