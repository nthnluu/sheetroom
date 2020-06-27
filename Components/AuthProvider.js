import React, {useState, createContext, useEffect} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {REFRESH_TOKEN, VERIFY_TOKEN} from "../gql/authentication";
import Cookies from "js-cookie";


export const UserContext = createContext();

export const UserConsumer = UserContext.Consumer;

export default UserContext


// Create a provider for components to consume and subscribe to changes
export const UserContextProvider = ({token, refreshToken, createdToken, children}) => {
    const [authToken, setToken] = useState();
    const [refToken] = useMutation(REFRESH_TOKEN);
    const [verifyToken] = useMutation(VERIFY_TOKEN);

    function setAuthToken({newToken, newRefreshToken}) {
        Cookies.set('homework.AuthToken', newToken);
        Cookies.set('homework.RefreshToken', newRefreshToken);
        Cookies.set('homework.AuthTokenCreated', Date.now());
        setToken(newToken);
    }

    useEffect(() => {
        if (token) {
            if (Date.now() - createdToken >= 240000) {
                //the authToken either expired or doesn't exist, BUT there is a refresh token
                refToken({variables: {refreshToken: refreshToken}})
                    .then(result => setAuthToken({
                        newToken: result.data.refreshToken.token,
                        newRefreshToken: refreshToken
                    }))
                    .catch(() => setToken(undefined));

            } else {
                //verify the token
                verifyToken({variables: {token: token}})
                    .then(() => setToken(token))
                    .catch(() => setToken(undefined));
            }
        } else {
            //user is anp
            setToken(undefined);
        }
    }, [token, refreshToken]);

    return (
        <UserContext.Provider value={authToken}>
            {children}
        </UserContext.Provider>
    );
};
