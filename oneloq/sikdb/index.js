const app = require('express')()
const DBManager = require('./dbmanager')
const config = require('./config.json')
console.log(config)

let db = new DBManager(config)

app.get ('/access/lookup/:user/:password', (req, res) =>  db.accessLookup(req.params, res) )
app.get('/key/lookup/:time/:owner/:type/:data/:txcontract/:txsender/:txrequester/:txrecipient', (req, res) => db.keyLookup(req.params, res) )
app.get('/key/add/:owner/:start/:end/:type/:data/:txcontract/:txsender/:txrequester/:txrecipient', (req, res) => db.keyAdd(req.params, res) )
app.get('/key/update/status/:owner/:value/:txcontract/:txsender/:txrequester/:txrecipient', (req, res) => db.keyUpdateStatus(req.params, res) )
app.get('/transaction/list/:limit', (req, res) => db.transactions(req.params, res))
app.get('/recoge', (req, res) => db.reset(res))

app.listen(config.port, (err) => console.log(`Sik db on port ${config.port} ...`))

