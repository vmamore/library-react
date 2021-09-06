import { Button, Offcanvas, ListGroup } from "react-bootstrap";
import { useState } from "react";

export function BookBag({ name }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const books = [
    "The Bible",
    "Fight Club",
    "Empresas Feitas para Durar",
    "Can`t Hurt Me",
  ];

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        My Bag
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your books</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            {books.map((title, index) => 
              <ListGroup.Item key={index}>{title}</ListGroup.Item>
            )}
          </ListGroup>
          <Button variant="outline-success">Rent books</Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
