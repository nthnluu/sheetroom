const {google} = require('googleapis');

export default async (req, res) => {

    const oauth2Client = new google.auth.OAuth2(
        "475128784822-m94d23qdrm2susr90pshanb6r7sls9l1.apps.googleusercontent.com",
        "8Lq8glfTC3GKH1PKVAFGnzKo",
        `${process.env.SITE}/api/google-classroom/auth-teacher-callback`
    );

    const {tokens} = await oauth2Client.getToken(req.query.code)
    oauth2Client.setCredentials(tokens);

    const stateQuery = JSON.parse(req.query.state)
    res.writeHead(302, {location: (`/assign-to-google-classroom/?gclass=${oauth2Client.credentials.access_token}&gClass1=${oauth2Client.credentials.refresh_token}&gClass2=${oauth2Client.credentials.expiry_date}&assignmentId=${stateQuery.assignmentId}&title=${stateQuery.defaultTitle}`)})
    res.end()
}

