import gql from "graphql-tag";

export const getSubmissionByPk = gql`
  subscription SubmissionByPk($submissionId: uuid!) {
assignments_submission_by_pk(id: $submissionId) {
    content
  }
}
`;

export const prepareSubmission = gql`
mutation PrepareSubmission($inviteId: uuid!){
  prepareSubmission(inviteId: $inviteId) {
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
    scoreReportByScoreReport {
      earned_points
      total_points
      created_at
      __typename
    }
  }
}
`;






