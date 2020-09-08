import gql from "graphql-tag";

export const getSubmissionByPk = gql`
  subscription SubmissionByPk($submissionId: uuid!) {
assignments_submission_by_pk(id: $submissionId) {
is_complete
    content
    inviteByInvite {
    config
  }
  }
}
`;

export const prepareSubmission = gql`
mutation PrepareSubmission($inviteId: uuid!, $googleClassPayload: String){
  prepareSubmission(inviteId: $inviteId, googleClassPayload: $googleClassPayload) {
    id
  }
}
`;


export const updateSubmissionContent = gql`
mutation UpdateAssignmentSubmission($submissionId: uuid!, $content: json!) {
  update_assignments_submission_by_pk(pk_columns: {id: $submissionId}, _set: {content: $content}){
  content
    __typename
  }
}`

export const scoreAssignment = gql`
mutation ScoreAssignment($submissionId: uuid!) {
  scoreSubmission(submissionId: $submissionId) {
    scoreReportId
  }
}`

export const getSubmissionWithScore = gql`
query GetSubmission($submissionId: uuid!){
  assignments_submission_by_pk(id: $submissionId) {
  content
  
  inviteByInvite {
  is_google_class
  google_class_config
  config
  }
  answer_key
    scoreReportByScoreReport {
      earned_points
      total_points
      created_at
      __typename
    }
  }
}
`;


export const getSubmissionsFromClassWithUser = gql`
query SubmissionForStudentInClass($userId: Int!, $classId: uuid!) {
  assignments_submission(where: {studentProfile: {student: {_eq: $userId}, class: {_eq: $classId}}, is_complete: {_eq: true}}, order_by: {scoreReportByScoreReport: {created_at: desc}}) {
    id
    inviteByInvite {
    submissions_aggregate(where: {studentProfile: {student: {_eq: $userId}}}) {
        aggregate {
          count
        }
      }
      assignmentByAssignment {
        title
      }
    }
    scoreReportByScoreReport {
      created_at
      total_points
      earned_points
    }
  }
}`

export const submissionsForStudentInClass = gql`
query StudentSubmissions($userId: Int!) {
  assignments_submission(where: {studentProfile: {student:{_eq: $userId}}}) {
    scoreReportByScoreReport {
      total_points
      earned_points
      created_at
    }
    inviteByInvite {
      assignmentByAssignment{
        title
      }
    }
  }
}`


export const getAllSubmissionsForUser = gql`
query GetAllSubmissionsForUser($userId: Int!) {
  assignments_submission(where: {created_by: {_eq: $userId}}, order_by: {scoreReportByScoreReport: {created_at: desc_nulls_last}}) {
  id
    inviteByInvite {
      classByClass {
        title
      }
    }
    content
  }
}`
