import { BrowserRouter, Route } from "react-router-dom";
import { PrivateRoute } from './utils/PrivateRoute';
import { AllRentals } from "./pages/AllRentals/AllRentals";
import { Checkout } from "./pages/Checkout/Checkout";
import { Catalog } from "./pages/Catalog/Catalog";
import { Home } from "./pages/Home/Home";
import { MyRents } from "./pages/MyRents/MyRents";

import { useKeycloak } from '@react-keycloak/web'

export function AppRouter() {

  const { initialized } = useKeycloak()

  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
      <BrowserRouter>
        <PrivateRoute path="/checkout" exact component={Checkout} />
        <PrivateRoute path="/my-rents" exact component={MyRents} />
        <PrivateRoute path="/all-rentals" exact component={AllRentals} />
        <PrivateRoute path="/catalog" exact component={Catalog} />
        <Route path="/" exact component={Home} />
      </BrowserRouter>
  );
}
