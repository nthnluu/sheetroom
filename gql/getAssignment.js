import gql from 'graphql-tag';

export const ASSIGNMENT = gql`
{
  assignment(assignmentId: "f845fb47-061b-40d1-aff3-c4c35654b09c")
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
