const express = require('express')
const app = express()
const config = require('./config.json')
const http = require('http')
const TokenManager = require('./tokenmanager')
const Manager = require('./manager')

let tm = new TokenManager(config.session.duration)
let mgr = new Manager(config)

function response(token, requestFunction, params, res ){
	if (tm.check(parseInt(token)))
		requestFunction(params, res)
	else
		res.json({ response: 'timeout'})
}

function keys(params, res){
	let item = tm.get(params.token)
	mgr.listKeys({token: params.token, user: item.data}, res)
}

function listLinks(params, res){
	mgr.listLinks(params, res)
}

function transactions(params, res){
	mgr.listTransactions(params, res)
}

function login(params, res){
	mgr.login(params, (data) => {
		let id = JSON.parse(data).id
		res.json( { token: tm.create(id > 0, id), granted: id > 0 } )
	})
}

//admin operations
app.get('/login/:user/:password', (req, res) => login(req.params, res))
app.get('/link/admin/list/:token', (req, res) => response(req.params.token, listLinks, req.params, res ))
app.get('/access/admin/addkey/:token/:key', (req, res) => response(req.params.token,addkey, req.params, res))
app.get('/access/admin/transactions/:token', (req, res) => response(req.params.token,transactions,req.params, res) )
app.get('/access/admin/deactivatekey/:token/:key', (req, res) => response(req.params.token, deactivateKey, req.params, res))

//tenant operations
app.get('/access/keys/:token', (req, res) => response(req.params.token,keys,req.params, res))
app.get('/access/check/:token/:key', (req, res) => response(req.params.token,checkaccess,req.params, res))
app.get('/access/confirmkey/:token/:key', (req, res) => response(req.params.token,confirmKey,req.params, res))


app.use(express.static('ui'))
app.listen(config.port, () => console.log(`OLConsole on ${config.port}`) )
