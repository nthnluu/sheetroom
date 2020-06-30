// import jwt from 'jsonwebtoken'
// import CryptoJS from 'crypto-js'
//
// export default async (req, res) =>  {
//     // Get token from cookie (names differ on local vs production)
//     const insecureCookieName = 'next-auth.session-token';
//     const encryptedToken = req.cookies[insecureCookieName];
//
//     // Decrypt using secret and return as string
//     const decryptedBytes = CryptoJS.AES.decrypt(encryptedToken, process.env.SECRET);
//     const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
//
//     // Still signed but not encrypted (this is what you want)
//     console.log(decryptedToken);
//
//     // If you wanted to verify it and get the object back, you would do this step too
//     const verifiedToken = jwt.verify(decryptedToken, process.env.SECRET);
//     console.log(verifiedToken);
//
//     res.end()
// }
