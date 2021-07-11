fetch('https://ubctime.herokuapp.com/api/ubco/subjects', {
    method: 'POST',
    headers: {'Content-type': 'applications/json'},
    body: {
        subject: 'hi',
        title: 'hi',
        faculty: 'hi',
        session: 'hi',
        campus: 'hi'
    }
}).then(r=> console.log('successfully'));