import { Col, Card, Button } from "react-bootstrap";
import AuthorizedFunction from "../../utils/AuthorizedFunction";

const BookStatus = {
  FREE: 1,
  RENTED: 2,
};

export function BookCatalog({ books, onHandleAddToBag, booksBag }) {
  if (!books) return <h1>Empty catalog</h1>;
  return books.map((book) => (
    <Col>
      <BookCatalogCard
        book={book}
        onHandleAddToBag={onHandleAddToBag}
        key={book.Id}
        isOnBagAlready={booksBag.some((bookBag) => bookBag.id === book.id)}
        isRented={parseInt(book.status) === BookStatus.RENTED}
      />
    </Col>
  ));
}

function BookCatalogCard({ book, onHandleAddToBag, isOnBagAlready, isRented }) {
  const buttonIfBookIsRented = isRented ? (
    <Button variant="danger" size="sm" disabled={true}>
      RENTED
    </Button>
  ) : null;
  const buttonIfIsOnBag = isOnBagAlready ? (
    <Button variant="dark" size="sm" disabled={true}>
      Book already in bag
    </Button>
  ) : (
    <Button
      variant="outline-dark"
      size="sm"
      onClick={() => onHandleAddToBag(book)}
    >
      Add to Bag
    </Button>
  );
  return (
    <Card>
      <Card.Img variant="top" src={book.photoUrl} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        {AuthorizedFunction(["locator"])
          ? isRented
            ? buttonIfBookIsRented
            : buttonIfIsOnBag
          : null}
      </Card.Body>
    </Card>
  );
}
