const express = require('express')

const config = require('./config.json')
const app = express()

app.listen(config.port, () => console.log(`Oneloq Central Console session on port ${config.port}`) )
