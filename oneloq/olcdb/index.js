const app = require('express')()
const config = require('./config.json')
const DBManager = require('./dbmanager')
let port = config.port

let db = new DBManager(config.dbpath)

app.get ('/access/lookup/:id/', (req, res) =>  db.user(req.params.id, res) )
app.get ('/access/list/', (req, res) =>  db.listUsers(res) )
app.get('/device/list/', (req, res) => db.listDevices(res) )
app.get('/premises/list/', (req, res) => db.listPremises(res) )
app.get('/link/lookup/:id/', (req, res) => db.link(req.params.id, res) )
app.get('/link/list/', (req, res) => db.listLinks(res) )

app.listen(port, (err) => console.log(`OLC db on port ${port} ...`))
