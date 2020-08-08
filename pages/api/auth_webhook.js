// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt'

export default async (req, res) => {
    const secret = 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw'
    const token = await jwt.getToken({ req, secret, raw: true})
    if (token) {
        console.log(token)
        // Signed in
        res.status(200).json({token: token})
    } else {
        // Not Signed in
        res.status(401)
    }
    res.end()
}
