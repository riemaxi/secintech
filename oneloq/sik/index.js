/* SIK */

const app = require('express')()
const config = require('./config.json')
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

app.get('/login/:user/:password', (req, res) => login(req.params, res) )
app.get('/checkaccess/:token/:time/:owner/:type/:data', (req, res) =>  response(req.params.token, checkAccess, req.params, res) )
app.get('/transactions/:token', (req, res) => response(req.params.token, transactions, req.params, res) )
app.get('/addkey/:token/:time/:owner', (req, res) => db.addKey(req.params, res))
app.get('/updatekey/:token/:time/:owner', (req, res) => db.updateKey(req.params, res)  )
app.get('/confirmkey/:token/:time/:owner', (req, res) => db.confirmKey(req.params, res) )
app.get('/deactivate/:token/:time/:owner', (req, res) => db.deactivateKey(req.params, res)  )


app.listen(config.port, (err) => console.log(`Sik on ${config.port} ...`))

