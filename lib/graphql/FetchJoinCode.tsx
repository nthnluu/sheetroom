import gql from "graphql-tag";

export const fetchJoinCode = gql`
query FetchJoinCode($joinCode: String!) {
  processJoinCode(joinCode: $joinCode) {
    type
    payload
  }
}
`

