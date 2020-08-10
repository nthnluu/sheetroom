import gql from "graphql-tag";

export const createClass = gql`
mutation CreateNewClass($title: String!, $userId: Int!, $color: String!) {
  insert_classes_class_one(object: {title: $title, created_by: $userId, color: $color}) {
    id
  }
}
`;


export const allClasses = gql`
query AllClasses($userId: Int!) {
  classes_class(where: {created_by: {
    _eq: $userId
  }}) {
    title
    id
    color
  }
}
`;
