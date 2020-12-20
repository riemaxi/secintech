const express = require('express')
const app = express();
const http = require('http')

let port = 30000

app.use(express.static('.'))
app.listen(port, () => console.log(`OLConsole on ${port}`) )
