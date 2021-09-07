import { Container } from "react-bootstrap";
import { BrowserRouter, Route } from "react-router-dom";
import { Checkout } from "./pages/Checkout/Checkout";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <Container className="p-3">
      <BrowserRouter>
        <Route path="/home" exact component={Home} />
        <Route path="/checkout" exact component={Checkout} />
      </BrowserRouter>
    </Container>
  );
}

export default App;
