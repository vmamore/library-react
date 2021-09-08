import { Col, Card, Button } from "react-bootstrap";

export function BookCatalog({ books, onHandleAddToBag }) {
  if (!books) return <h1>Empty catalog</h1>;

  return books.map(book => (
    <Col>
      <BookCatalogCard book={book} onHandleAddToBag={onHandleAddToBag} key={book.Id}/>
    </Col>
  ));
}

function BookCatalogCard({ book, onHandleAddToBag }) {
  return (
    <Card>
      <Card.Img
        variant="top"
        src={book.photoUrl}
      />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <Button variant="outline-dark" size="sm" onClick={() => onHandleAddToBag(book)}>Add to Bag</Button>
      </Card.Body>
    </Card>
  );
}
