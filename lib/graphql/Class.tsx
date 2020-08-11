import gql from "graphql-tag";

export const createClass = gql`
mutation CreateNewClass($title: String!, $userId: Int!, $color: String!, $joinCode: String!) {
  insert_classes_class_one(object: {title: $title, created_by: $userId, color: $color, join_code: $joinCode}) {
    id
    __typename
  }
}
`;

export const classByPk = gql`
query ClassByPk($classId: uuid!) {
 classes_class_by_pk(id: $classId) {
    title
    id
    join_code
    studentProfiles {
      user {
        name
        image
        email
      }
    }
    __typename
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
    __typename
  }
}
`;
