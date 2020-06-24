import '../styles/index.css'
import {ApolloProvider, useMutation} from '@apollo/react-hooks';
import apolloClient from "../apolloClient";
import Cookie from "js-cookie";
import gql from "graphql-tag";

//CHECKS LOG IN STATUS
function CheckUserAuth() {
    const VERIFY_TOKEN = gql`mutation($token: String!) {
  verifyToken(token: $token) {
    payload
  }
}
`;

    const REFRESH_TOKEN = gql`
  mutation($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    payload
  }
}
`;

    const token = Cookie.get("homework.authToken");
    const refreshToken = Cookie.get("homework.refreshToken");

    if (token) {
        //deal with token
        const [verifyToken, {data}] = useMutation(VERIFY_TOKEN);
    } else {
        if (refreshToken) {
            //deal with refresh token
            const [refreshToken, {data}] = useMutation(VERIFY_TOKEN);
        } else {
            //user is not logged in
            console.log('Annonymous user');
        }
    }

    return <></>
}

function App({Component, pageProps}) {

    return <ApolloProvider client={apolloClient()}><CheckUserAuth/><Component {...pageProps} /></ApolloProvider>;
}

export default App;
