import { useEffect, useState } from "react";
import { Accordion, ListGroup, Badge, Row, Col, Button } from "react-bootstrap";
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
    fetchAllRentsFromLocator("3e8eefd3-5f27-46f0-9381-7d1e1a80d2a1").then(
      (b) => {
        setBookRentals({
          state: "resolved",
          data: b.data,
        });
      }
    );
  }

  function goToCatalog() {
    history.push("/");
  }

  if (bookRentals.state === "idle") return <h1>Loading...</h1>;

  return (
    <>
      <h1>
        My Rentals <BsFillBagFill />
      </h1>
      <Accordion defaultActiveKey="0" flush>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Badge style={{ marginRight: "35px" }} pill bg="success">
              {bookRentals.data.status}
            </Badge>
            <Badge style={{ marginRight: "35px" }} pill bg="primary">
              Rented Day: {convertDate(bookRentals.data.rentedDay)}
            </Badge>
            <Badge style={{ marginRight: "35px" }} pill bg="warning">
              Day to Return: {convertDate(bookRentals.data.dayToReturn)}
            </Badge>
            <Badge style={{ marginRight: "35px" }} pill bg="info">
              Librarian: {bookRentals.data.librarianName}
            </Badge>
          </Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <h4>Rented Books</h4>
              {bookRentals.data.books.map((book, index) => (
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
      </Accordion>
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
    </>
  );
}
