const express = require('express');
const bodyparser = require('body-parser');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

const messages = [
    {name:"Abhijeet",message:"Hello, Abhijeet!"},
    {name:"Foo",message:"Hello, Foo!"},
    {name:"Poo",message:"Hello, Poo!"}
];

app.get('/messages', (req, res) => {
    res.send(messages);
})

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
})

io.on('connection', (socket) => {
    console.log('User Connected');
})

const server = http.listen(3000, () => {
    console.log(`Server running at http://localhost:${server.address().port}`);
});