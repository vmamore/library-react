import KeycloakService from '../keycloak';

export default function AuthorizedFunction(roles) {
    const keycloak = KeycloakService.keycloak
    const isAuthorized = () => {
        if (keycloak && keycloak.authenticated && roles) {
            return roles.some(r => {
                const realm =  keycloak.hasRealmRole(r);
                const resource = keycloak.hasResourceRole(r);
                return realm || resource;
            });
        }
        return false;
    }

    return isAuthorized();
}