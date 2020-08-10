import gql from "graphql-tag";

export const createClass = gql`
mutation CreateNewClass($title: String!, $userId: Int!) {
  insert_classes_class_one(object: {title: $title, created_by: $userId}) {
    id
  }
}
`;
