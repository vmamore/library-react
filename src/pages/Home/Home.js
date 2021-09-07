import { Row } from "react-bootstrap";
import { BookSearch } from "../../components/BookSearch/BookSearch";
import { BookCatalog } from "../../components/BookCatalog/BookCatalog";
import { BookPagination } from "../../components/BookPagination/BookPagination";
import { useEffect, useState } from "react";
import { fetchAllBooks } from "../../services/library-api";
import { useLocalStorageState } from '../../utils';

export function Home() {
  const [bookBag, setBookBag] = useLocalStorageState('book-bag', [])
  const [bookTitle, setBookTitle] = useState(null);
  const [booksPagination, setbooksPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllBooks(1, bookTitle)
    }, 1500)

    return () => clearTimeout(delayDebounceFn)
  }, [bookTitle])

  useEffect(() => {
    getAllBooks(currentPage);
  }, [currentPage]);

  async function getAllBooks(page = 1, title = '') {
    fetchAllBooks(page, title).then((b) => {
      setbooksPagination({
        books: b.data.books,
        totalPages: b.data.totalPages,
        totalCount: b.data.totalCount
      })
    });
  }

  function addBookToBag(book) {
    if (bookBag && bookBag.some(b => b.id === book.id)) return;
    let copyBookBag = [...bookBag]
    copyBookBag.push(book)
    setBookBag(copyBookBag)
  }

  function clearBag() {
    setBookBag([])
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
      <Row xs={1} md={5} className="g-4">
        <BookCatalog books={booksPagination.books} onHandleAddToBag={addBookToBag} />
      </Row>
      <Row>
        <BookPagination totalPages={booksPagination.totalPages} currentPage={currentPage} onPageClick={setCurrentPage} />
      </Row>
    </>
  );
}
