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
    stripeCustomerId
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

export const updateProfileData = gql`
mutation UpdateProfileData($userId: Int!, $firstName: String!, $lastName: String!) {
  update_users_by_pk(pk_columns: {id: $userId}, _set: {first_name: $firstName, last_name: $lastName}) {
    __typename
  }
}`

export const deleteUser = gql`
mutation DeleteAccount($userId: Int!) {
  delete_users_by_pk(id: $userId){
    __typename
  }
  
  delete_accounts(where: {user_id: {_eq: $userId}}) {
    __typename
  }
}`


export const proStats = gql`
query ProData($userId: Int!){
  assignments_assignment_aggregate(where: {created_by: {_eq: $userId}}) {
    aggregate {
      count
    }
  }
  
  classes_class_aggregate(where: {created_by: {_eq: $userId}}) {
    aggregate {
      count
    }
  }
  
}`
