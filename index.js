const express = require('express');

const app = express();

app.use(express.static(__dirname))

const server = app.listen(3000, () => {
    console.log(`Server running at http://localhost:${server.address().port}`);
});