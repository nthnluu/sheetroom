import gql from "graphql-tag";

export const onboardUser = gql`
mutation SetProfileInfo($role: String!, $firstName: String!, $lastName: String!, $userId: Int!) {
  update_users_by_pk(pk_columns: {id: $userId}, _set: {account_type: $role, first_name: $firstName, last_name: $lastName}) {
    __typename
  }
}`

export const me = `
query Me($userId: Int!) {
  users_by_pk(id: $userId) {
    first_name
    last_name
    is_pro
    image
    account_type
    __typename
  }
}
`


export const changeAccountType = gql`
    mutation ChangeAccountType ($newType: String!, $userId: Int!) {
  update_users_by_pk(pk_columns: {id: $userId}, _set: {account_type: $newType}) {
    __typename
  }
}`
