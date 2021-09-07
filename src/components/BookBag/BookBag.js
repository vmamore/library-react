import { Button, Offcanvas, ListGroup } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router";

export function BookBag({ books, onClearBag }) {
  let history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function goToCheckout() {
    history.push("/checkout")
  }

  if (!books)
    return <p>Empty Bag</p>

  return (
    <>
      <Button variant="primary" onClick={handleShow} size="sm">
        My Bag ({books.length})
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your books</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            {books.map(book => 
              <ListGroup.Item key={book.id}>{book.title} - {book.author}</ListGroup.Item>
            )}
          </ListGroup>
          <Button variant="outline-success" onClick={goToCheckout}>Rent books</Button>
          <Button variant="outline-danger" onClick={onClearBag}>Clear bag</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
