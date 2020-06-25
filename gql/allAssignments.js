import gql from 'graphql-tag';

export const ALL_ASSIGNMENTS = gql`
query allAssignments($token: String!) {
  allAssignments(token: $token) {
    id
  }
}
`;
