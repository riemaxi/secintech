/* SIK */
const constant = require('./constant.json')
const config = require('./config.json')

const app = require('express')()
const DBManager = require('./dbmanager')
const TokenManager = require('./tokenmanager')

let tm = new TokenManager(config.session.duration)
let db = new DBManager(config.db)

function response(token, requestFunction, params, res ){
	if (tm.check(parseInt(token)))
		requestFunction(params, res)
	else
		res.json({ response: 'timeout'})
}

function login(params, res){
	db.login(params, (token) => {
		res.json( { token: tm.add(token) } )
	})
}

function checkAccess(params, res){
	db.checkAccess(params, res)
}

function transactions(params, res){
	db.transactions(params, res)
}

function addKey(params, res){
	params.status = constant.key.status.INACTIVE
	db.addKey(params, res)
}

function addActiveKey(params, res){
	params.status = constant.key.status.ACTIVE
	db.addKey(params, res)
}

function confirmKey(params, res){
	db.confirmKey(params, res)
}

function deactivateKey(params, res){
	db.deactivateKey(params, res)
}

function keys(params, res){
	db.keys(params, res)
}

app.get('/login/:user/:password', (req, res) => login(req.params, res) )
app.get('/checkaccess/:token/:time/:owner/:id/:txcontract/:txsender/:txrequester/:txrecipient', (req, res) =>  response(req.params.token, checkAccess, req.params, res) )
app.get('/transactions/:token/:limit', (req, res) => response(req.params.token, transactions, req.params, res) )
app.get('/addkey/:token/:owner/:id/:start/:end/:type/:data/:txcontract/:txsender/:txrequester/:txrecipient', (req, res) => response(req.params.token, addKey, req.params, res) )
app.get('/confirmkey/:token/:owner/:id/:txcontract/:txsender/:txrequester/:txrecipient', (req, res) => response(req.params.token, confirmKey, req.params, res) )
app.get('/deactivatekey/:token/:owner/:id/:txcontract/:txsender/:txrequester/:txrecipient', (req, res) => response(req.params.token, deactivateKey, req.params, res)  )
app.get('/keys/:token/:owner', (req, res) => response(req.params.token, keys, req.params, res) )
app.get('/updatekey/:token/:owner/:id', (req, res) => db.updateKey(req.params, res)  )

app.get('/addactivekey/:token/:owner/:id/:start/:end/:type/:data/:txcontract/:txsender/:txrequester/:txrecipient', (req, res) => response(req.params.token, addActiveKey, req.params, res) )

app.listen(config.port, (err) => console.log(`Sik on ${config.port} ...`))
