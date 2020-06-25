import gql from "graphql-tag";

export const REFRESH_TOKEN = gql`
  mutation TokenAuth($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
    token
  }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
    __typename
  }
  }
`;

export const ME = gql`
  query Me($token: String!) {
      me(token: $token){
    email
    firstName
  }
  }
`;
