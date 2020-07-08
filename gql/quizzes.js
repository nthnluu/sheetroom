import gql from "graphql-tag";

export const ASSIGNMENT = gql`
query AssignmentByPk($id: uuid!) {
  assignments_assignment_by_pk(id: $id)
  {
    title
    id
    sections {
      items {
        content
        blocks
        type
        answer_choices {
          id
          content
        }
      }
    }
  }
}
`;
