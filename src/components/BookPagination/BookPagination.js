import { Pagination } from "react-bootstrap";

export function BookPagination() {
  let active = 2;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="justify-content-md-center mt-2">
      <Pagination.Prev />
      {items}
      <Pagination.Next />
    </Pagination>
  );
}
