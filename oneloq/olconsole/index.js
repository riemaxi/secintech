const express = require('express')
const app = express();
//const http = require('http').createServer(app);
const config = require('./config.json')

app.use(express.static('html'))

app.listen(config.port, () => console.log(`OLConsole on ${config.port}`) )

app.get('/', (req, res) => res.sendFile(__dirname + '/html/index.html') )
