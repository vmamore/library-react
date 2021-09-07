import { useLocalStorageState } from "../../utils";
import { Button, ListGroup } from "react-bootstrap";
import { useHistory } from "react-router";
import { createBookRental } from "../../services/library-api";

export function Checkout() {
  const history = useHistory();
  const [bookBag, setBookBag] = useLocalStorageState("book-bag");

  function goToHome() {
    history.push("/home");
  }

  function createRental() {
    createBookRental(bookBag).then(
      (c) => console.log(c),
      (err) => console.log(err)
    );
  }

  if (!bookBag) return <p>Empty Bag</p>;

  return (
    <>
      <ListGroup variant="flush">
        {bookBag.map((book, index) => (
          <ListGroup.Item key={index}>
            {book.title} - {book.author}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="outline-dark" onClick={goToHome}>
        Back to Catalog
      </Button>

      <Button variant="outline-success" onClick={createRental}>
        Rent Books
      </Button>
    </>
  );
}
