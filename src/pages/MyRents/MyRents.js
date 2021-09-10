import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { fetchAllRentsFromLocator } from "../../services/library-api";

export function MyRents() {
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

  if (bookRentals.state === "idle") return <h1>Loading...</h1>;

  return (
    <ListGroup variant="flush" className="mb-3">
      <ListGroup.Item key={bookRentals.data.id}>
        {bookRentals.data.rentedDay} - {bookRentals.data.status}
      </ListGroup.Item>
    </ListGroup>
  );
}
