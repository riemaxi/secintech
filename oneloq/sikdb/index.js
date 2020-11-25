const app = require('express')()
const DBManager = require('./dbmanager')
const config = require('./config.json')
console.log(config)

let db = new DBManager(config)

app.get ('/access/lookup/:user/:password', (req, res) =>  db.accessLookup(req.params, res) )
app.get('/key/lookup/:owner/:time/:type/:data', (req, res) => db.keyLookup(req.params, res) )

app.listen(config.port, (err) => console.log(`Sik db on port ${config.port} ...`))

