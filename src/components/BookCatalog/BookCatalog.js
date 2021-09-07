import { Col, Card, Button } from "react-bootstrap";

export function BookCatalog({ books, onHandleAddToBag }) {
  if (!books) return <h1>Empty catalog</h1>;

  return books.map((book, idx) => (
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
        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22339%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20339%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17bb95e9d1d%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3Avar(--bs-font-sans-serif)%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17bb95e9d1d%22%3E%3Crect%20width%3D%22339%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22127.6484375%22%20y%3D%2289%22%3E339x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
      />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <Button variant="outline-dark" size="sm" onClick={() => onHandleAddToBag(book)}>Add to Bag</Button>
      </Card.Body>
    </Card>
  );
}
