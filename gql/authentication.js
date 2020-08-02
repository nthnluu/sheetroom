import gql from "graphql-tag";

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
    token
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
