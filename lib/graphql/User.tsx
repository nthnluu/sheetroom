import gql from "graphql-tag";

export const onboardUser = gql`
mutation SetProfileInfo($role: String!, $firstName: String!, $lastName: String!) {
  update_users_by_pk(pk_columns: {id: 30}, _set: {account_type: $role, first_name: $firstName, last_name: $lastName}) {
    __typename
  }
}`
