import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'library',
  clientId: 'library-react'
});

export default keycloak;