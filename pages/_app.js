import '../styles/index.css'
import {ApolloProvider} from '@apollo/react-hooks';
import apolloClient from "../apolloClient";


function App({Component, pageProps}) {

    return <ApolloProvider client={apolloClient()}>
        <Component {...pageProps} /></ApolloProvider>;
}

export default App;

