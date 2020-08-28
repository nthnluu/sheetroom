import gql from "graphql-tag";

export const sendFeedback = gql`
mutation SendFeedback($userId: Int, $messageContent: String!, $reaction: String, $url: String!) {
    insert_feedback(objects: {user: $userId, message: $messageContent, reaction: $reaction, url: $url}) {
        __typename
    }
}
`

