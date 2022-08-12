const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

const dbUrl = "mongodb+srv://abhi:abhi@cluster0.udaif2h.mongodb.net/?retryWrites=true&w=majority";

const Message = mongoose.model('Message', {
    name: String,
    message: String,
});


app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', async (req, res) => {
    const message = new Message(req.body);

    const savedMessage = await message.save();

    console.log('saved');

    const censored = await Message.findOne({message: 'badword'});

    if (censored) 
        await Message.deleteOne({_id: censored});
    else
        io.emit('message', req.body);

    res.sendStatus(200);

    // .catch((err) => {
    //     sendStatus(500)
    // })
})
    

io.on('connection', (socket) => {
    console.log('User Connected');
})

mongoose.connect(dbUrl, (err) => {
    console.log('Mongo db conneection ', err);
})
const server = http.listen(3000, () => {
    console.log(`Server running at http://localhost:${server.address().port}`);
});