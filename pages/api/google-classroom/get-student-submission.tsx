const {google} = require('googleapis');

export default async (req, res) => {

    const response = await fetch(`https://classroom.googleapis.com/v1/courses/${req.query.courseId}/courseWork/${req.query.courseworkId}/studentSubmissions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${req.query.token}`
        }
    })
        .then(result => console.log(result))

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(response))

}

