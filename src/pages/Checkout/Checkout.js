import { useLocalStorageState } from "../../utils/LocalStorageHook";
import { Button, ListGroup, Badge, Image, Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { createBookRental } from "../../services/library-api";
import { BsPlus, BsCheck } from "react-icons/bs";

export function Checkout() {
  const history = useHistory();
  const [bookBag, setBookBag] = useLocalStorageState("book-bag");

  function goToHome() {
    history.push("/");
  }

  function createRental() {
    createBookRental(bookBag).then(
      (c) => {
        setBookBag([]);
        goToHome();
      },
      (err) => console.log(err)
    );
  }

  if (!bookBag) return <p>Empty Bag</p>;

  return (
    <Container className="p-3">
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
      </Container>
  );
}
