// This is an example of how to read a JSON Web Token from an API route
import jwt from 'next-auth/jwt'

export default async (req, res) => {
    console.log(req)
    const secret = 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw'
    const newReq = req.rawHeaders
    const token = await jwt.getToken({ newReq, secret})
    console.log(token)
    res.status(200).json(token)
}
