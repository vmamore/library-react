import axios from "axios";
import KeycloakService from "../keycloak"

export async function fetchAllBooks(page, title) {
  if(!page) page = 1
  const url = `${process.env.REACT_APP_LIBRARY_API}/rentals/books/all?page=${page}&title=${title}`;
  return await axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + KeycloakService.keycloak.token
    }
  });
}

export async function createBookRental(books) {
  const url = `${process.env.REACT_APP_LIBRARY_API}/rentals`;
  const profile = await KeycloakService.keycloak.loadUserProfile()
  const payload = {
    booksId: books.map((book) => book.id),
    locatorId: profile.attributes.library_id[0]
  };

  return await axios.post(url, payload);
}

export async function fetchAllRentsFromLocator() {
  const profile = await KeycloakService.keycloak.loadUserProfile()
  console.log(profile)
  console.log(KeycloakService.keycloak.realmAccess)
  const locatorId = profile.attributes.library_id[0]
  const url = `${process.env.REACT_APP_LIBRARY_API}/rentals/${locatorId}`;
  return await axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + KeycloakService.keycloak.token
    }
  });
}