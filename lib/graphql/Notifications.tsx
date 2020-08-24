import gql from "graphql-tag";

export const getActivityObjects = gql`
query GetActivityObjects($userId: Int!) {
  notifications_activity_object(where: {target_user: {_eq: $userId}}) {
    active_time
    target_user
    content
  }
}
`;
