import jwt from 'jsonwebtoken'
import CryptoJS from 'crypto-js'

const callAPI = async (path, body, headers) => {
    const res = await fetch(process.env.GRAPHQL_URL, {
        method: 'post',
        headers: {
            'content-type': 'application/json',
            ...headers,
        },
        body: JSON.stringify(body),
    });
    return {
        body: await res.text(),
        status: res.status,
        headers: res.headers,
    };
};
const forwardHeader = (res, apiRes, header) => {
    if (apiRes.headers.get(header)) {
        res.setHeader(header, apiRes.headers.get(header));
    }
};
const forwardResponse = (res, apiRes) => {
    forwardHeader(res, apiRes, 'content-type');
    forwardHeader(res, apiRes, 'www-authenticate');
    res.status(apiRes.status);
    res.send(apiRes.body);
};
export default async function graph(req, res) {
    try {
        // Get token from cookie (names differ on local vs production)
        const secureCookieName = '__Secure-next-auth.session-token';
        const insecureCookieName = 'next-auth.session-token';
        const encryptedToken = req.cookies[secureCookieName] || req.cookies[insecureCookieName];

        // Decrypt using secret and return as string
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, process.env.SECRET);
        const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
        console.log(decryptedToken);
        const apiRes = await callAPI('graphql', req.body, {
            Authorization: decryptedToken ? `Bearer ${decryptedToken}` : ""
        });
        forwardResponse(res, apiRes);
    } catch (error) {
        console.error(error);
        res.status(error.status || 400).end(error.message);
    }
}
