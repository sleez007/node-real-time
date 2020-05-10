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

let count = 0;

io.on('connection',socket=>{
    console.log(socket)
    console.log('new connection ')
    socket.emit('countUpdated',count);
    socket.on('increment',()=>{
        count++
        //using socket.emit sends only to a particular client which is the connected one
        //socket.emit('countUpdated',count);
        io.emit('countUpdated',count);
    })
}); 

http.listen(process.env.PORT, ()=>console.log(process.env.PORT));