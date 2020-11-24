let app = require('express')()
let config = require('./config.json')
let SecManager = require('./securitymanager')
let Manager = require('./manager')

let secMgr = new SecManager(config.dbService)
let mgr = new Manager()

function login(user, password, res){
	secMgr.lookupUser(user, password, (exists) => res.json({ response: exists ? new Date().getTime():0 }))
}

function checkToken(token, handle){
	secMgr.lookupToken(token, handle)
}

function reply(token, rhandle, params, res){
	checkToken( token, (ok) => ok?rhandle(params, res) : res.json({response : 'timeout'}) )
}

app.get('/login/:user/:password', (req, res) => login(req.params.user, req.params.password, res))
app.get('/sik/data/:token', (req, res) => reply(req.params.token, mgr.sikData, req.params, res) )
app.get('/sik/checkaccess/:token/:time/:owner/:type/:data', (req, res) =>  reply(req.params.token, mgr.sikCheckAccess, req.params, res) )

app.get('/sik/addkey/:token/:time/:owner/', (req, res) =>  reply(req.params.token, mgr.sikAddKey, req.params, res))
app.get('/sik/updatekey/:token/:time/:owner/', (req, res) =>  reply(req.params.token, mgr.sikUpdateKey, req.params, res) ) 
app.get('/sik/confirmkey/:token/:time/:owner/', (req, res) =>  reply(req.params.token, mgr.sikConfirmKey, req.params, res))
app.get('/sik/deactivate/:token/:time/:owner/', (req, res) =>  reply(req.params.token, mgr.sikDeactivateKey, req.params, res))


app.listen(config.port, ()=> console.log(`OLC on ${config.port}`))
