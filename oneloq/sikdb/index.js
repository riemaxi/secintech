const app = require('express')()
const config = require('./config.json')
const DBManager = require('./dbmanager')
const SQLManager = require('../common/sqlmanager')
let port = config.port

let sql = new DBManager(config.dbpath, config.blockchainCapacity)

function lookupUser(user, password, res){
	let query  = `select count(*) size from access where user = '${user}' and password = '${password}'`
	sql.collection( query, (item) => res.json({ response: item.size > 0 }) )
}

app.listen(port, (err) => console.log(`Sik db on port ${port} ...`))

app.get ('/lookup/user/:user/:password', (req, res) =>  lookupUser(req.params.user, req.params.password, res) )
