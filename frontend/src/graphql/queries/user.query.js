import { gql } from "@apollo/client";

const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authenticatedUser {
      id
      breed
    }
  }
`;
