const express = require('express');
const path = require('path');
const helmet = require('helmet');
const Filter = require('bad-words');
const { generateMessage, generateLocationMessage } = require('./util/messages');

const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(helmet())

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res, next)=>{
    res.sendFile('./index.html')
})

io.on('connection',socket=>{
    console.log(socket)
    console.log('new connection ')
    //socket.emit to send to the particular connected user
    socket.emit('message',generateMessage('Welcome'));

    //socket.broadcast.emit to send to all users except the emitting user
    socket.broadcast.emit('message', generateMessage('A new user just joined'));

    socket.on('sendMessage',(message, callback)=>{
        const filter = new Filter();

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed!')
        }
        //io.emit to send to every connected user including emitting user
        io.emit('message',generateMessage(message))
        callback()
    })

    socket.on('sendLocation', (cordinate,cb)=>{
        console.log(cordinate);
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${cordinate.latituide},${cordinate.longituide}`));
        cb();
    })


    socket.on('disconnect',()=>io.emit('message',generateMessage('A user has left!')))
});


http.listen(process.env.PORT, ()=>console.log(process.env.PORT));