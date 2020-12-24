const config = require('./config.json')
const express = require('express')
const Channel = require('./channel')

const app = express()
app.use(express.static('ui'))
app.listen(config.port, (err) => console.log(`OLS agent on ${config.port} ...`))

new Channel(config.channel)
