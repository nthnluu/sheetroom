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
    first_name
    last_name
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
  submissions(where: {_and: {studentProfile: {student: {_eq: $userId}}, is_complete: {_eq: false}}}) {
    id
    created_at
  }
  assignmentByAssignment {
    title
    user {
    first_name
    last_name
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
mutation CreateNewInvite($code: String!, $userId: Int!, $assignmentId: uuid!, $isPublic: Boolean!, $classId: uuid, $settingsObject: String!, $isGoogleClass: Boolean, $googleClassConfig: String){
    insert_assignments_invite_one(object: {join_code: $code, created_by: $userId, assignment: $assignmentId, config: $settingsObject, is_public: $isPublic, class: $classId, is_google_class: $isGoogleClass, google_class_config: $googleClassConfig}) {
    id
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

export const invitePage = gql`
subscription InvitePage($inviteId: uuid!) {
  assignments_invite_by_pk(id: $inviteId) {
  id
    config
    is_public
    is_disabled
    join_code
    assignmentByAssignment {
      title
    }
    
    submissions(order_by: {scoreReportByScoreReport: {created_at: desc_nulls_last}}) {
      created_at
      id
      studentProfile {
        user  {
          first_name
          last_name
        }
      }
      
      scoreReportByScoreReport {
        total_points
        earned_points
        created_at
      }
      
    }
  }
}`


export const updateInviteConfig = gql`
    mutation UpdateSettings($inviteId: uuid!, $newConfig: String!) {
  update_assignments_invite_by_pk(pk_columns: {id: $inviteId}, _set: {config: $newConfig}) {
    __typename
  }
}`

export const getInvitesForClass = gql`
query GetInvitesForClass($classId: uuid!) {
  classes_class_by_pk(id: $classId) {
    invites {
    id
    created_at
      is_public
      assignmentByAssignment {
        title
      }
      submissions_aggregate(where: {score_report: {_is_null: false}}) {
        aggregate {
          count
        }
      }
    }
  }
}`

export const deleteInvite = gql`
mutation DeleteInvite($inviteId: uuid!) {
  delete_assignments_invite_by_pk(id: $inviteId) {
    assignmentByAssignment {
      id
    }
    __typename
  }
}`


export const toggleIsDisabled = gql`
    mutation ToggleIsDisabled($inviteId: uuid!, $newState: Boolean!) {
  update_assignments_invite_by_pk(pk_columns: {id: $inviteId}, _set: {is_disabled: $newState}) {
    is_disabled
  }
}`
