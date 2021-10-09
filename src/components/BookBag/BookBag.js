import {
  Button,
  Offcanvas,
  ListGroup,
  Image,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router";
import { BsBagFill } from "react-icons/bs";

export function BookBag({ books, onClearBag }) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function goToCheckout() {
    history.push("/checkout");
  }

  if (!books || books.length === 0) return <p>Empty Bag</p>;

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <BsBagFill /> ({books.length})
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Bag</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush" class="mb-3">
            {books.map((book, index) => (
              <>
                <ListGroup.Item key={book.id}>
                  <Badge bg="dark">{index + 1}</Badge>
                  <Image
                    style={{ height: "55px", width: "55px" }}
                    src={book.photoUrl}
                    rounded
                  />{" "}
                  {book.title} - {book.author}
                </ListGroup.Item>
              </>
            ))}
          </ListGroup>
          <hr />
          <Row>
            <Col md={4}>
              <Button
                variant="outline-success"
                onClick={() => {
                  goToCheckout();
                }}
              >
                Rent books
              </Button>
            </Col>
            <Col md={{ span: 4, offset: 4 }}>
              <Button
                variant="outline-danger"
                onClick={() => {
                  handleClose();
                  onClearBag();
                }}
              >
                Clear bag
              </Button>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
