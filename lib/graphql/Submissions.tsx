import gql from "graphql-tag";

export const getSubmissionByPk = gql`
  query SubmissionByPk($submissionId: uuid!) {
assignments_submission_by_pk(id: $submissionId) {
    content
  }
}
`;

export const prepareSubmission = gql`
mutation PrepareSubmission($inviteId: uuid!, $userId: Int!){
  prepareSubmission(inviteId: $inviteId, userId: $userId) {
    id
  }
}
`;


