const app = require('express')()
const config = require('./config.json')
const DBManager = require('./dbmanager')

let db = new DBManager(config.db)

app.get('/data', (req, res) => db.data(req.params, res) )
app.get('/checkaccess/:token/:time/:owner/:type/:data', (req, res) =>  db.checkAccess(req.params, res) )
app.get('/addkey/:token/:time/:owner', (req, res) => db.addKey(req.params, res))
app.get('/updatekey/:token/:time/:owner', (req, res) => db.updateKey(req.params, res)  )
app.get('/confirmkey/:token/:time/:owner', (req, res) => db.confirmKey(req.params, res) )
app.get('/deactivate/:token/:time/:owner', (req, res) => db.deactivateKey(req.params, res)  )


app.listen(config.port, (err) => console.log(`Sik reception on port ${config.port} ...`))

