const app = require('express')()
const config = require('./config.json')
const DBManager = require('./dbmanager')
const SQLManager = require('../common/sqlmanager')
let port = config.port

let sql = new DBManager(config.dbpath)

function lookupUser(user, password, res){
	let query  = `select count(*) size from access where user = '${user}' and password = '${password}'`
	sql.collection( query, (item) => res.json({ response: item.size > 0 }) )
}

function listDevice(res){
	let query = 'select * from device'

	let list = []
	sql.collectionToClosure( query, (item) => list.push(item), ()=> res.send(list) )
}

app.listen(port, (err) => console.log(`OLC db on port ${port} ...`))

app.get ('/lookup/user/:user/:password', (req, res) =>  lookupUser(req.params.user, req.params.password, res) )
app.get('/list/device/', (req, res) => listDevice(res) )
