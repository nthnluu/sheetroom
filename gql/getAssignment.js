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


export const CREATE_ASSIGNMENT = gql`
mutation CreateNewAssignment($title: String!, $content: json!, $userId: Int!) {
  insert_assignments_assignment(objects: {title: $title, content: $content, created_by: $userId}) {
    returning {
      id
    }
  }
}
`;
