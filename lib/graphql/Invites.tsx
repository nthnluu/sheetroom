import gql from "graphql-tag";

export const getInviteByJoinCodeWithoutSession = gql`
  query InviteByJoinCode($joinCode: String!) {
assignments_invite(limit: 1, where: {join_code: {
  _eq: $joinCode
}}) {
id
  is_public
  assignmentByAssignment {
    title
    user {
    name
    }
  }
  __typename
}
}
`;

export const getInviteByJoinCodeWithSession = gql`
  query InviteByJoinCode($joinCode: String!, $userId: Int) {
assignments_invite(limit: 1, where: {join_code: {
  _eq: $joinCode
}}) {
id
  is_public
  submissions(where: {_and: {studentProfile: {student: {_eq: $userId}}, is_submitted: {_eq: false}}}) {
    id
    created_at
  }
  assignmentByAssignment {
    title
    user {
    name
    }
  }
  __typename
}
}
`;

export const getInviteByPk = gql`
  query InviteByPk($inviteId: uuid!) {
assignments_invite_by_pk(id: $inviteId) {
    assignmentByAssignment {
      title
      content
    }
  }
}
`;


export const createInvite = gql`
mutation CreateNewInvite($code: String!, $userId: Int!, $assignmentId: uuid!, $isPublic: Boolean!){
    insert_assignments_invite_one(object: {join_code: $code, created_by: $userId, assignment: $assignmentId, is_public: $isPublic}) {
        join_code
        __typename
    }
}
`;

export const getAssignmentInvites = gql`
query GetAssignmentInvites($assignmentId: uuid!) {
  assignments_invite(where: {assignment: {_eq: $assignmentId}}) {
    id
    join_code
    created_at
    is_public
    classByClass {
      title
      __typename
    }
    __typename
  }
}`
