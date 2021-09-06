import {
    Button,
    InputGroup,
    FormControl
  } from "react-bootstrap";

export function BookSearch() {
    return (
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search books..."
            aria-label="Book title"
            aria-describedby="book-title"
          />
          <Button variant="outline-primary">Find</Button>
        </InputGroup>
    )
}