import gql from 'graphql-tag';

export const ALL_ASSIGNMENTS = gql`
    {
  allAssignments {
    id
  }
}
`;
