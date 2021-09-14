import { Pagination, PageItem } from "react-bootstrap";

export function BookPagination({ totalPages, currentPage, onPageClick }) {
  let items = [];

  if (!totalPages) return null;

  items.push(
    <PageItem key={1} active={1 === currentPage} onClick={() => onPageClick(1)}>
      {1}
    </PageItem>
  );

  for (let number = 2; number <= totalPages; number++) {
    items.push(
      <PageItem
        key={number}
        active={number === currentPage}
        onClick={() => onPageClick(number)}
      >
        {number}
      </PageItem>
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
