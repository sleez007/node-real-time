const express = require('express');
const path = require('path')
const helmet = require('helmet')

const app = express();

app.use(helmet())

app.use(express.static(path.join(__dirname,'public')));

app.use('/', (req, res, next)=>{
    res.send('index.html')
})

app.listen(process.env.PORT, ()=>console.log(process.env.PORT));