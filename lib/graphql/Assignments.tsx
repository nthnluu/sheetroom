import gql from "graphql-tag";

export const assignmentSubscription = gql`
  query AssignmentByPk($assignmentId: uuid!) {
 assignments_assignment_by_pk(id: $assignmentId){
 last_edited_by
 invites {
    id
    join_code
    __typename
  }
 updated_at
    title
    id
    content
    __typename
  }
}
`;


export const createAssignment = gql`
mutation CreateNewAssignment($title: String!, $content: json!, $userId: Int!) {
  insert_assignments_assignment(objects: {title: $title, content: $content, created_by: $userId}) {
    returning {
      id
      __typename
    }
  }
}
`;

export const updateAssignmentContent = gql`
 mutation UpdateAssignmentContent($content: json!, $id: uuid!, $clientId: uuid!) {
    update_assignments_assignment_by_pk(pk_columns: {id: $id}, _set: {content: $content, last_edited_by: $clientId}){
 last_edited_by
  }
}
`;

export const updateAssignmentTitle = gql`
  mutation UpdateAssignmentTitle($title: String!, $assignmentId: uuid!, $clientId: uuid!) {
    assignments_assignment_by_pk: update_assignments_assignment_by_pk(pk_columns: {id: $assignmentId}, _set: {title: $title, last_edited_by: $clientId}){
 last_edited_by
  }
}
`;

