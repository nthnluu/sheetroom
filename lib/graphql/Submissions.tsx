import gql from "graphql-tag";

export const getSubmissionByPk = gql`
  query SubmissionByPk($submissionId: uuid!) {
assignments_submission_by_pk(id: $submissionId) {
    content
  }
}
`;

export const createSubmission = gql`
  mutation CreateSubmission($assignmentCopy: json!, $studentProfile: uuid!, $inviteId: uuid!) {
insert_assignments_submission_one(object: {content: $assignmentCopy, student_profile: $studentProfile, invite: $inviteId}) {
id
}
}
`;


