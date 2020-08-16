import gql from "graphql-tag";

export const getInviteByJoinCode = gql`
  query InviteByJoinCode($joinCode: String!) {
assignments_invite(limit: 1, where: {join_code: {
  _eq: $joinCode
}}) {
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

