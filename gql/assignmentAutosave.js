import gql from "graphql-tag";

export const UPDATE_ASSIGNMENT_TITLE = gql`
  mutation UpdateAssignment($title: String!, $assignmentId: uuid!) {  
  update_assignments_assignment_by_pk(pk_columns: {id: $assignmentId}, _set: {title: $title}) {
    id
  }
  }
`;

export const UPDATE_ITEM_INDEX = gql`
  mutation UpdateAssignment($title: String!, $assignmentId: uuid!) {  
  update_assignments_assignment_by_pk(pk_columns: {id: $assignmentId}, _set: {title: $title}) {
    id
  }
  }
`;

// export const GeneratedItemIndexMutation = (items) => {
//
//     const mutations = items.map((item, index) => `item${item.id}: update_assignments_item_by_pk(pk_columns: {id: ${item.id}}, _set: {index: ${index}) {
//     index
//   }`);
//
//     return gql`mutation update_indicies {
//   ${mutations.join()}
// }`;
//
// }
