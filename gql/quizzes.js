import gql from "graphql-tag";

export const ASSIGNMENT_WS = gql`
subscription AssignmentByPk($id: uuid!) {
  assignments_assignment_by_pk(id: $id)
  {
  updated_at
    title
    id
    sections {
      id
      items(order_by: {index: asc}) {
        id
        content
        type
        index
        answer_objects(order_by: {index: asc}) {
          id
          item
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
        type
        index
        answer_objects(order_by: {index: asc}) {
          id
          content
        }
      }
    }
  }
}
`;


