import gql from "graphql-tag";

export const ASSIGNMENT_WS = gql`
subscription AssignmentByPk($id: uuid!) {
  assignments_assignment_by_pk(id: $id)
  {
  updated_at
    title
    id
    content
  }
}
`;

export const ASSIGNMENT = gql`
query AssignmentByPk($assignmentId: uuid!) {
 assignments_assignment_by_pk(id: $assignmentId){
  updated_at
    title
    id
    content
  }
}
`;


