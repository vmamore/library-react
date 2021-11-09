import { useEffect, useState } from "react";
import { Accordion, ListGroup, Badge, Row, Col, Button,Container } from "react-bootstrap";
import { useHistory } from "react-router";
import { fetchAllRentsFromLocator } from "../../services/library-api";
import { BsBook, BsFillBagFill } from "react-icons/bs";

function convertDate(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function MyRents() {
  const history = useHistory();
  const [bookRentals, setBookRentals] = useState({
    state: "idle",
    data: {},
  });

  useEffect(() => {
    getAllRentalsFromLocator();
  }, []);

  async function getAllRentalsFromLocator() {
    fetchAllRentsFromLocator().then(
      (b) => {
        setBookRentals({
          state: "resolved",
          data: b.data,
        });
      }
    );
  }

  function goToCatalog() {
    history.push("/catalog");
  }

  if (bookRentals.state === "idle") return <h1>Loading...</h1>;

  var bookRentalsComponent = bookRentals.data ? (bookRentals.data.map(bookRental => (
    <Accordion defaultActiveKey="0" flush key={bookRental.id}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <Badge style={{ marginRight: "35px" }} pill bg="success">
            {bookRental.status}
          </Badge>
          <Badge style={{ marginRight: "35px" }} pill bg="primary">
            Rented Day: {convertDate(bookRental.rentedDay)}
          </Badge>
          <Badge style={{ marginRight: "35px" }} pill bg="warning">
            Day to Return: {convertDate(bookRental.dayToReturn)}
          </Badge>
          {bookRental.returnedDay && (
            <Badge style={{ marginRight: "35px" }} pill bg="info">
              Returned Day: {convertDate(bookRental.returnedDay)}
            </Badge>
          )}
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup variant="flush">
            <h4>Rented Books</h4>
            {bookRental.books.map((book, index) => (
              <>
                <ListGroup.Item eventKey={index}>
                  <BsBook /> <b>{book.title} </b>
                  <Badge pill bg="secondary">
                    {book.author}
                  </Badge>
                </ListGroup.Item>
              </>
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>)
  )) : <h2>Your rentals history is empty. Let's change this?</h2>;

  return (
    <Container className="p-3">
      <h1>
        My Rentals <BsFillBagFill />
      </h1>
      {bookRentalsComponent}
      <hr />
      <Row>
        <Col md={4}>
          <Button
            variant="outline-success"
            onClick={() => {
              goToCatalog();
            }}
          >
            See Book Catalog
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
