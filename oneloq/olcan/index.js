const config = require('./config.json')
const express = require('express')
const Manager = require('./manager')

const app = express()
app.use(express.static('ui'))
app.listen(config.port, (err) => console.log(`OLC Agent Network on ${config.port} ...`))


let manager = new Manager(config.channel)

