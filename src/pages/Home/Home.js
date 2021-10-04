import { Row, Spinner } from "react-bootstrap";
import { BookSearch } from "../../components/BookSearch/BookSearch";
import { BookCatalog } from "../../components/BookCatalog/BookCatalog";
import { BookPagination } from "../../components/BookPagination/BookPagination";
import { useEffect, useState } from "react";
import { fetchAllBooks } from "../../services/library-api";
import { useLocalStorageState } from "../../utils";
import { useKeycloak } from "@react-keycloak/web";

export function Home() {
  const { keycloak, initialized } = useKeycloak();
  const [bookBag, setBookBag] = useLocalStorageState("book-bag", []);
  const [bookTitle, setBookTitle] = useState("");
  const [booksPagination, setbooksPagination] = useState({
    state: "idle",
    books: [],
    totalPages: 0,
    totalCount: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllBooks(1, bookTitle);
    }, 1500);

    return () => clearTimeout(delayDebounceFn);
  }, [bookTitle]);

  useEffect(() => {
    getAllBooks(currentPage);
  }, [currentPage]);

  async function getAllBooks(page = 1, title = "") {
    fetchAllBooks(page, title).then((b) => {
      setbooksPagination({
        state: "resolved",
        books: b.data.books,
        totalPages: b.data.totalPages,
        totalCount: b.data.totalCount,
      });
    });
  }

  function addBookToBag(book) {
    if (bookBag && bookBag.some((b) => b.id === book.id)) return;
    let copyBookBag = [...bookBag];
    copyBookBag.push(book);
    setBookBag(copyBookBag);
  }

  function clearBag() {
    setBookBag([]);
  }

  if (!keycloak.authenticated) {
    return (
      <>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </>
    );
  }

  if (booksPagination.state === "resolved") {
    return (
      <>
        <Row className="justify-content-md-center">
          <BookSearch
            onHandleClick={getAllBooks}
            onUpdateBookTitle={setBookTitle}
            bookBag={bookBag}
            onClearBag={clearBag}
          />
        </Row>
        <Row xs={1} md={5} className="g-4">
          <BookCatalog
            books={booksPagination.books}
            onHandleAddToBag={addBookToBag}
            booksBag={bookBag}
          />
        </Row>
        <Row>
          <BookPagination
            totalPages={booksPagination.totalPages}
            currentPage={currentPage}
            onPageClick={setCurrentPage}
          />
        </Row>
      </>
    );
  }

  return (
    <>
      <Row className="justify-content-md-center">
        <BookSearch
          onHandleClick={getAllBooks}
          onUpdateBookTitle={setBookTitle}
          bookBag={bookBag}
          onClearBag={clearBag}
        />
      </Row>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
}
