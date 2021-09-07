import {
  Button,
  InputGroup,
  FormControl,
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import { BookBag } from "../BookBag/BookBag";

export function BookSearch({
  onHandleClick,
  onUpdateBookTitle,
  bookBag,
  onClearBag,
}) {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="dark"
      className="mb-2"
    >
      <Container>
        <Nav className="me-auto">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search books..."
              aria-label="Book title"
              aria-describedby="book-title"
              onChange={(event) => onUpdateBookTitle(event.target.value)}
            />
            <Button variant="outline-primary" onClick={() => onHandleClick()}>
              Find
            </Button>
          </InputGroup>
        </Nav>
        <Nav>
          <BookBag books={bookBag} onClearBag={onClearBag} />
        </Nav>
      </Container>
    </Navbar>
  );
}
