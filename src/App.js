import { Container, Row } from "react-bootstrap";
import { BookSearch } from "./components/BookSearch/BookSearch";
import { BookCatalog } from "./components/BookCatalog/BookCatalog";
import { BookPagination } from "./components/BookPagination/BookPagination";
import { BookBag } from "./components/BookBag/BookBag";

function App() {
  return (
    <Container className="p-3">
      <Row className="justify-content-md-center">
        <BookSearch />
      </Row>
      <BookBag name="Rent Books" />
      <Row xs={1} md={5} className="g-4">
        <BookCatalog />
      </Row>
      <Row>
        <BookPagination />
      </Row>
    </Container>
  );
}

export default App;
