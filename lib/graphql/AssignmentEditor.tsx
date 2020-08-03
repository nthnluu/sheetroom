import gql from "graphql-tag";

export const assignmentSubscription = gql`
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

