import gql from "graphql-tag";

export const UPDATE_ASSIGNMENT_TITLE = gql`
  mutation UpdateAssignment($title: String!, $assignmentId: uuid!) {  
  update_assignments_assignment_by_pk(pk_columns: {id: $assignmentId}, _set: {title: $title}) {
    id
  }
  }
`;

export const UPDATE_ITEM_INDEX = gql`
  mutation UpdateItemIndex($pk: uuid!, $index: Int!) {
  update_assignments_item_by_pk(pk_columns: {id: $pk}, _set: {index: $index}) {
    index
  }
  }
`;
