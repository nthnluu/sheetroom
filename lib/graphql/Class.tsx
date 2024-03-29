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
subscription ClassByPk($classId: uuid!) {
 classes_class_by_pk(id: $classId) {
    title
    id
    user {
    first_name
        last_name
        image
        email
    }
    join_code
    studentProfiles {
      user {
      id
        first_name
        last_name
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
    join_code
    studentProfiles {
      __typename
    }
    __typename
  }
}
`;

export const allClassesStudent = gql`
query AllClasses($userId: Int!) {
  classes_class(where: {studentProfiles: {student: {_eq: $userId}}}) {
    title
    id
    color
    user {
      first_name
      last_name
    }
    __typename
  }
}
`;

export const createStudentProfile = gql`
mutation CreateStudentProfile($studentId: Int!, $classId: uuid!) {
  insert_classes_studentProfile_one(object: {student: $studentId, class: $classId}) {
    __typename
  }
}
`


export const classByJoinCode = gql`
query ClassByJoinCode($joinCode: String!) {
    classes_class(where: {join_code: {_eq: $joinCode}}, limit: 1) {
    title
    id
    created_by
    studentProfiles {
      user {
        id
      }
    }
    user {
      first_name
      last_name
    }
    __typename
  }
}
`

export const searchClasses = gql`
query SearchClasses($searchValue: String!, $userId: Int!) {
  classes_class(where: {title: {_ilike: $searchValue}, created_by: {_eq: $userId}}, limit: 3) {
    title
    id
  }
}`


export const updateClassTitle = gql`
mutation UpdateClassTitle($classId: uuid!, $newTitle: String!) {
  update_classes_class_by_pk(pk_columns: {id: $classId}, _set: {title: $newTitle}) {
    __typename
  }
}
`;

export const deleteStudentProfile = gql`
mutation DeleteStudentProfile($studentId: Int!, $classId: uuid!) {
  delete_classes_studentProfile(where: {student: {_eq: $studentId}, class: {_eq: $classId}}) {
    __typename
  }
}`

export const deleteClass = gql`
mutation DeleteClass($classId: uuid!) {
  delete_classes_class_by_pk(id: $classId) {
    __typename
  }
}`
