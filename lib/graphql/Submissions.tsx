import gql from "graphql-tag";

export const getSubmissionByPk = gql`
  query SubmissionByPk($submissionId: uuid!) {
assignments_submission_by_pk(id: $submissionId) {
    content
  }
}
`;
