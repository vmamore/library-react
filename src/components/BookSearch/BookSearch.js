import {
  Button,
  InputGroup,
  FormControl,
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import { BookBag } from "../BookBag/BookBag";
import { BsSearch, BsCollection } from "react-icons/bs";
import { useHistory } from "react-router";
import AuthorizedFunction from "../../utils/AuthorizedFunction";

export function BookSearch({
  onHandleClick,
  onUpdateBookTitle,
  bookBag,
  onClearBag,
}) {
  const history = useHistory();

  function goToMyRents() {
    history.push("/my-rents");
  }

  function goToAllRentals() {
    history.push("/all-rentals");
  }

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
              <BsSearch />
            </Button>
          </InputGroup>
        </Nav>
        {AuthorizedFunction(['locator']) && (
          <Nav>
            <Button
              variant="outline-success"
              style={{ marginRight: "15px" }}
              onClick={() => {
                goToMyRents();
              }}
            >
              <BsCollection /> My Rents
            </Button>
            <BookBag books={bookBag} onClearBag={onClearBag} />
          </Nav>
        )}
        {AuthorizedFunction(['librarian']) && (
          <Nav>
            <Button
              variant="outline-success"
              style={{ marginRight: "15px" }}
              onClick={() => {
                goToAllRentals();
              }}
            >
              <BsCollection /> See All Rentals
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
