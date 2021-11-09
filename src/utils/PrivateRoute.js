import { useKeycloak } from '@react-keycloak/web'
import { Route, Redirect } from 'react-router-dom'

export function PrivateRoute({component: Component, ...rest}) {
    const { keycloak } = useKeycloak()

  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak?.authenticated ? (
            <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}