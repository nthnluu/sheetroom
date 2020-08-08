// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt'

export default async (req, res) => {
    const secret = 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw'
    const token = await jwt.getToken({ req, secret })
    if (token) {
        // Signed in
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({
            "X-Hasura-User-Id": token["X-Hasura-User-Id"],
            "X-Hasura-Role": "user",
        }))
    } else {
        // Not Signed in
        res.status(401)
    }
    res.end()
}
