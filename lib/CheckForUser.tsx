import {getSession} from "next-auth/client";
import {me} from "./graphql/User";

const CheckForUser = async (req, res, privatePage = false) => {
    let session = await getSession({req});
    let profileData;

    if (session) {
        if (session.id) {
            profileData = await fetch('https://api.sheetroom.com/v1/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': 'HASURA_ADMIN_SECRETd92iecpo0@v#nfse-bflit!*@2*%xodd4dk6g(xra^nbxnc(a#PENIS'
                },
                body: JSON.stringify({query: me, variables: {userId: session.id}}),
            })
                .then(response => response.json())
                .catch((error) => {
                    console.error('Error:', error);
                });
            if (profileData.data.users_by_pk.account_type === "new") {
                res.writeHead(302, {location: '/welcome'})
                res.end()
            } else {
                return {
                    props: {
                        session,
                        profileData
                    },
                };
            }
        } else {
            return {
                props: {
                    session
                },
            };
        }

    } else {
        if (privatePage) {
            res.writeHead(302, {location: '/'})
            res.end()
        } else {
            return {
                props: {session}
            }
        }
    }
}

export default CheckForUser
