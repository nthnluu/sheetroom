import gql from "graphql-tag";

// export const assignmentSubscription = gql`
//   query AssignmentByPk($assignmentId: uuid!) {
//  assignments_assignment_by_pk(id: $assignmentId){
//  last_edited_by
//  updated_at
//     title
//     id
//     content
//   }
// }
// `;


export const createInvite = gql`
mutation CreateNewInvite($code: String!, $userId: Int!, $assignmentId: uuid!, $isPublic: Boolean!){
    insert_assignments_invite_one(object: {join_code: $code, created_by: $userId, assignment: $assignmentId, is_public: $isPublic}) {
        join_code
    }
}
`;

