import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import { AllRentals } from "./pages/AllRentals/AllRentals";
import { Checkout } from "./pages/Checkout/Checkout";
import { Home } from "./pages/Home/Home";
import { MyRents } from "./pages/MyRents/MyRents";

function App() {
  return (
    <Container className="p-3">
      <BrowserRouter>
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/my-rents" exact component={MyRents} />
        <Route path="/all-rentals" exact component={AllRentals} />
        <Route path="/" exact component={Home} />
      </BrowserRouter>
    </Container>
  );
}

export default App;
