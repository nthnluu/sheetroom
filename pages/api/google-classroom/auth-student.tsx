const {google} = require('googleapis');

export default async (req, res) => {
    const oauth2Client = new google.auth.OAuth2(
        "475128784822-m94d23qdrm2susr90pshanb6r7sls9l1.apps.googleusercontent.com",
        "8Lq8glfTC3GKH1PKVAFGnzKo",
        `https://www.sheetroom.com/api/google-classroom/auth-student-callback`
    );

    const scopes = [
        'https://www.googleapis.com/auth/classroom.coursework.me',
    ];

    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

        // If you only need one scope you can pass it as a string
        scope: scopes
    });

    res.writeHead(302, {location: (url + "&state=" + req.query.joinCode + "&prompt=consent")})
    res.end()
}

