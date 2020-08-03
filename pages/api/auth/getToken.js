import CryptoJS from "crypto-js";

export default (req, res) => {
    try {
        // Get token from cookie (names differ on local vs production)
        const secureCookieName = '__Secure-next-auth.session-token';
        const insecureCookieName = 'next-auth.session-token';
        const encryptedToken = req.cookies[secureCookieName] || req.cookies[insecureCookieName];

        // Decrypt using secret and return as string
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, process.env.SECRET);
        const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ token: decryptedToken }))
    } catch (error) {
        res.status(error.status || 400).end(error.message);
    }
}

