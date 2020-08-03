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


export const createAssignment = gql`
mutation CreateNewAssignment($title: String!, $content: json!, $userId: Int!) {
  insert_assignments_assignment(objects: {title: $title, content: $content, created_by: $userId}) {
    returning {
      id
    }
  }
}
`;
