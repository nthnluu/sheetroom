import gql from "graphql-tag";

export const UPDATE_ASSIGNMENT_TITLE = gql`
  mutation UpdateAssignmentTitle($title: String!, $assignmentId: uuid!) {
    update_assignments_assignment_by_pk(pk_columns: {id: $assignmentId}, _set: {title: $title}){
        __typename
    }
}
`;


