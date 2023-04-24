import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      booksCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {}
  }
`;
