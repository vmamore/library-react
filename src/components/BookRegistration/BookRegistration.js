import { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import { createBook } from "../../services/library-api";

export function BookRegistration(props) {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [releasedYear, setReleasedYear] = useState(null);
  const [pages, setPages] = useState(null);
  const [version, setVersion] = useState(null);

  function createBookSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    createBook({
      title,
      author,
      isbn,
      photoUrl,
      releasedYear,
      pages,
      version,
    }).then((response) => {
      history.go(0);
      props.onHide();
    });
  }

  function onChange(input, setState) {
    setState(input.target.value);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">New Book</Modal.Title>
      </Modal.Header>
      <Form onSubmit={createBookSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              onChange={(e) => onChange(e, setTitle)}
              value={title}
              type="text"
              placeholder="Book title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              onChange={(e) => onChange(e, setAuthor)}
              value={author}
              type="text"
              placeholder="Book author"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicIsbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              onChange={(e) => onChange(e, setIsbn)}
              value={isbn}
              type="text"
              placeholder="ISBN"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhotoURL">
            <Form.Label>Photo URL</Form.Label>
            <Form.Control
              onChange={(e) => onChange(e, setPhotoUrl)}
              value={photoUrl}
              type="text"
              placeholder="PhotoURL"
              required
            />
          </Form.Group>

          <Row className="g-3">
            <Col>
              <Form.Group className="mb-3" controlId="formBasicReleasedYear">
                <Form.Label>Released Year</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setReleasedYear)}
                  value={releasedYear}
                  type="text"
                  placeholder="Released year"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPages">
                <Form.Label>Pages</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setPages)}
                  value={pages}
                  type="number"
                  placeholder="Pages"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicVersion">
                <Form.Label>Version</Form.Label>
                <Form.Control
                  onChange={(e) => onChange(e, setVersion)}
                  value={version}
                  type="number"
                  placeholder="Version"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            Create
          </Button>
          <Button variant="warning" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}