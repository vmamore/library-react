import { Col, Card, Button } from "react-bootstrap";

export function BookCatalog({ books, onHandleAddToBag, booksBag }) {
  if (!books) return <h1>Empty catalog</h1>;

  return books.map((book) => (
    <Col>
      <BookCatalogCard
        book={book}
        onHandleAddToBag={onHandleAddToBag}
        key={book.Id}
        isOnBagAlready={booksBag.some((bookBag) => bookBag.id === book.id)}
      />
    </Col>
  ));
}

function BookCatalogCard({ book, onHandleAddToBag, isOnBagAlready }) {
  return (
    <Card>
      <Card.Img variant="top" src={book.photoUrl} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        {isOnBagAlready ? (
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
        )}
      </Card.Body>
    </Card>
  );
}
