import gql from "graphql-tag";

export const UPDATE_ASSIGNMENT_TITLE = gql`
  mutation UpdateAssignmentTitle($title: String!, $assignmentId: uuid!) {
    update_assignments_assignment_by_pk(pk_columns: {id: $assignmentId}, _set: {title: $title}){
        __typename
    }
}
`;

export const UPDATE_ASSIGNMENT_CONTENT = gql`
  mutation UpdateAssignmentContent($content: String!, $id: uuid!) {
    update_assignments_assignment_by_pk(pk_columns: {id: $id}, _set: {content: $content}){
        __typename
    }
}
`;

export const UPDATE_ITEM_CONTENT = gql`
  mutation UpdateItemContent($itemId: uuid!, $content: json!) {
  update_assignments_item_by_pk(pk_columns: {id: $itemId}, _set: {content: $content}){
    __typename
  }
}
`;

export const UPDATE_ITEM_TYPE = gql`
  mutation UpdateItemContent($itemId: uuid!, $type: String!) {
  update_assignments_item_by_pk(pk_columns: {id: $itemId}, _set: {controller_type: $type}){
    __typename
  }
}
`;

export const UPDATE_ITEM_CONTROLLER = gql`
  mutation UpdateItemContent($itemId: uuid!, $controller: json!) {
  update_assignments_item_by_pk(pk_columns: {id: $itemId}, _set: {answer_controller: $controller}){
    __typename
  }
}
`;

export function debounce(func, waitTime) {
    let timeout;

    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, waitTime);
    };
};

