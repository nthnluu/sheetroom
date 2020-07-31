import gql from "graphql-tag";

export const ASSIGNMENT_WS = gql`
subscription AssignmentByPk($assignmentId: uuid!) {
 assignments_assignment_by_pk(id: $assignmentId){
 last_edited_by
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
 last_edited_by
 updated_at
    title
    id
    content
  }
}
`;


