import gql from "graphql-tag";

export const instructorSearch = gql`
  query InstructorSearch($userId: Int!,  $searchValue: String!) {
assignments_assignment(where: {title: {_ilike: $searchValue}, created_by: {_eq: $userId}}, limit: 5) {
    title
    id
    __typename
  }

  classes_class(where: {title: {_ilike: $searchValue}, created_by: {_eq: $userId}}, limit: 5) {
    title
    id
    __typename
  }
}
`;
