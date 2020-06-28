import gql from "graphql-tag";

export const CREATE_QUIZ = gql`
  mutation InsertQuiz($title: String!, $desc: String) {
  insert_quiz(objects: {title: $title, description: $desc}) {
    returning {
      id
    }
  }
}
`;

export const QUIZ = gql`
query QuizByPk($id: uuid!) {
  quiz_by_pk(id: $id)
  {
    title
  }
}
`;
