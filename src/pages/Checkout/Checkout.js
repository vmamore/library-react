import { useLocalStorageState } from "../../utils";
import { Button, ListGroup, Badge, Image, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import { createBookRental } from "../../services/library-api";
import { BsPlus, BsCheck } from "react-icons/bs";

export function Checkout() {
  const history = useHistory();
  const [bookBag] = useLocalStorageState("book-bag");

  function goToHome() {
    history.push("/");
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
      <h3>Checkout ({bookBag.length} items)</h3>
      <ListGroup variant="flush" class="mb-4">
        {bookBag.map((book, index) => (
          <>
            <ListGroup.Item key={book.id}>
              <Badge bg="dark">{index + 1}</Badge>
              <Image
                style={{ height: "55px", width: "55px", marginLeft: "15px" }}
                src={book.photoUrl}
                rounded
              />{" "}
              {book.title} - {book.author}
            </ListGroup.Item>
          </>
        ))}
      </ListGroup>
      <Row className="justify-content-md-end">
        <Col md="auto">
          <Button variant="outline-dark" onClick={goToHome}>
            <BsPlus /> Find more books
          </Button>
        </Col>
        <Col md="auto">
          <Button variant="outline-success" onClick={createRental}>
            <BsCheck /> Finish Order
          </Button>
        </Col>
      </Row>
    </>
  );
}
