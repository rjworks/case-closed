const express = require('express');
const app = express();
const router = require('./routes/router');

app.use(express.json());
app.use('/api', router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});