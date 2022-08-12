const express = require('express');

const app = express();

app.use(express.static(__dirname))

const messages = [
    {name:"Abhijeet",message:"Hello, Abhijeet!"},
    {name:"Foo",message:"Hello, Foo!"},
    {name:"Poo",message:"Hello, Poo!"}
];

app.get('/messages', (req, res) => {
    res.send(messages);
})

const server = app.listen(3000, () => {
    console.log(`Server running at http://localhost:${server.address().port}`);
});