import axios from "axios";

export async function fetchAllBooks(page, title) {
  if(!page) page = 1
  const url = `${process.env.REACT_APP_LIBRARY_API}/rentals/books/all?page=${page}&title=${title}`;
  return await axios.get(url);
}

export async function createBookRental(books) {
  const url = `${process.env.REACT_APP_LIBRARY_API}/rentals`;

  const payload = {
    booksId: books.map((book) => book.id),
    librarianId: "ef082d2c-f03a-46b5-9c17-7e4b91b6493e",
    locatorId: "3e8eefd3-5f27-46f0-9381-7d1e1a80d2a1",
  };

  return await axios.post(url, payload);
}
