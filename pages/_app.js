import '../styles/index.css'
import {ApolloProvider, useMutation} from '@apollo/react-hooks';
import apolloClient from "../apolloClient";
import Cookie from "js-cookie";


function App({Component, pageProps}) {

    return <ApolloProvider client={apolloClient()}>
        <Component {...pageProps} /></ApolloProvider>;
}

export default App;

