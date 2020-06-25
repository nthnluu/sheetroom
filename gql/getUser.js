import gql from 'graphql-tag';

export const USER = gql`
{
  user(userId: "f845fb47-061b-40d1-aff3-c4c35654b09c")
  {
    title
    questions {
      id
      type
      content
      answers {
        id
        content
      }
    }
  }
}
`;

export const VERIFY_TOKEN = gql`mutation($token: String!) {
  verifyToken(token: $token) {
    __typename
  }
}
`;

export const REFRESH_TOKEN = gql`
  mutation($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    token
  }
}
`;

export const ME = gql`
  {
  me {
    id
    email
    firstName
    lastName
  }
}
`;

