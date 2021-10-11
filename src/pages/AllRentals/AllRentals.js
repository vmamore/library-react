import { useEffect, useState } from "react";
import { Accordion, ListGroup, Badge, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import { fetchAllRents, returnBookRental } from "../../services/library-api";
import {
  BsBook,
  BsFillBagFill,
  BsFillArrowLeftSquareFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";

function convertDate(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function AllRentals() {
  const history = useHistory();
  const [bookRentals, setBookRentals] = useState({
    state: "idle",
    data: {},
  });

  useEffect(() => {
    getAllRentals();
  }, []);

  async function getAllRentals() {
    fetchAllRents().then((b) => {
      setBookRentals({
        state: "resolved",
        data: b.data,
      });
    });
  }

  function goToCatalog() {
    history.push("/");
  }

  function bookRentalReturned(bookRentalId) {
    returnBookRental(bookRentalId)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  }

  if (bookRentals.state === "idle") return <h1>Loading...</h1>;

  var bookRentalsComponent = bookRentals.data.map(bookRental => (
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
          {!bookRental.returnedDay && (
            <Row>
              <Col md={{ span: 3, offset: 10 }}>
                <Button
                  variant="success"
                  style={{ marginTop: "15px" }}
                  onClick={() => bookRentalReturned(bookRental.id)}
                >
                  <BsFillBookmarkCheckFill /> Finish Rental
                </Button>
              </Col>
            </Row>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>)
  );

  return (
    <>
      <h1>
        All Rentals <BsFillBagFill />
      </h1>
      {bookRentalsComponent}
      <hr />
      <Row>
        <Col md={4}>
          <Button
            variant="outline-primary"
            onClick={() => {
              goToCatalog();
            }}
          >
            <BsFillArrowLeftSquareFill /> Home
          </Button>
        </Col>
      </Row>
    </>
  );
}
