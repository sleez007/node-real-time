const express = require('express');
const path = require('path')
const helmet = require('helmet')

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
    socket.emit('message','Welcome!');
    socket.on('sendMessage',(message)=>{
        io.emit('message',message)
    })
    socket.on('disconnect',()=>console.log('closed'))
});


http.listen(process.env.PORT, ()=>console.log(process.env.PORT));