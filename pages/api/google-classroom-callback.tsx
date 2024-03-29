const {google} = require('googleapis');

export default async (req, res) => {

    console.log(req.query)
    const oauth2Client = new google.auth.OAuth2(
        "475128784822-m94d23qdrm2susr90pshanb6r7sls9l1.apps.googleusercontent.com",
        "8Lq8glfTC3GKH1PKVAFGnzKo",
        `${process.env.SITE}/api/google-classroom-callback`
    );

    const {tokens} = await oauth2Client.getToken(req.query.code)
    oauth2Client.setCredentials(tokens);

    res.writeHead(302, {location: ('/join/' + req.query.state + `?gclass=` + oauth2Client.credentials.access_token)})
    res.end()
}

