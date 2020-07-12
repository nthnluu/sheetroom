import gql from "graphql-tag";

export const ASSIGNMENT_WS = gql`
subscription AssignmentByPk($id: uuid!) {
  assignments_assignment_by_pk(id: $id)
  {
  updated_at
    title
    id
    sections {
      items(order_by: {index: asc}) {
        id
        content
        blocks
        type
        answer_choices(order_by: {index: asc}) {
          id
          is_correct
          index
          content
        }
      }
    }
  }
}
`;

export const ASSIGNMENT = gql`
query AssignmentByPk($id: uuid!) {
  assignments_assignment_by_pk(id: $id)
  {
    title
    id
    sections {
      items(order_by: {index: asc}) {
        id
        content
        blocks
        type
        index
        answer_choices {
          id
          content
        }
      }
    }
  }
}
`;


