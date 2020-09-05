import gql from "graphql-tag";

export const assignmentSubscription = gql`
  subscription AssignmentByPk($assignmentId: uuid!) {
 assignments_assignment_by_pk(id: $assignmentId){
 last_edited_by
 invites {
    id
    join_code
    __typename
  }
 updated_at
    title
    id
    content
    __typename
  }
}
`;


export const createAssignment = gql`
mutation CreateNewAssignment($title: String!, $content: json!, $userId: Int!) {
  insert_assignments_assignment(objects: {title: $title, content: $content, created_by: $userId}) {
    returning {
      id
      __typename
    }
  }
}
`;

export const updateAssignmentContent = gql`
 mutation UpdateAssignmentContent($content: json!, $id: uuid!) {
    update_assignments_assignment_by_pk(pk_columns: {id: $id}, _set: {content: $content}){
 __typename
  }
}
`;

export const updateAssignmentTitle = gql`
  mutation UpdateAssignmentTitle($title: String!, $assignmentId: uuid!, $clientId: uuid!) {
    assignments_assignment_by_pk: update_assignments_assignment_by_pk(pk_columns: {id: $assignmentId}, _set: {title: $title, last_edited_by: $clientId}){
 last_edited_by
  }
}
`;

export const getSubmissionsForAssignment = gql`
query ResultsPage($assignmentId: uuid!) {
  assignments_assignment_by_pk(id: $assignmentId) {
    invites(order_by: {created_at: desc}) {
    id
    is_public
    join_code
      classByClass {
        title
      }
   user {
   first_name
   last_name}
    created_at
      submissions_aggregate(where: {score_report: {_is_null: false}}, order_by: {scoreReportByScoreReport: {created_at: desc}}) {
        aggregate {
          count
        }
      }
    }
  }
}
`;

export const deleteAssignment = gql`
mutation DeleteAssignment($assignmentPk: uuid!) {
  delete_assignments_assignment_by_pk(id: $assignmentPk) {
    title
    __typename
  }
}`


export const assignmentGridStudent = gql`
subscription StudentAssignmentGrid($userId: Int!) {
  assignments_invite(where: {classByClass: {studentProfiles: {student: {_eq: $userId}}}}) {
  id
    assignmentByAssignment {
      title
    }
    submissions(where: {studentProfile: {student: {_eq: $userId}}}) {
      score_report
    }
    join_code
    config
    user {
      first_name
      last_name
    }
    classByClass {
      title
      color
    }
  }
}`


export const assignmentGridTeacher = gql`
subscription Assignments($userId: Int!){
  assignments_assignment(where: {created_by: {_eq: $userId}}, limit: 10, order_by: {updated_at: desc}) {
    id,
    title
    updated_at
    __typename
  }
  
}
`;
