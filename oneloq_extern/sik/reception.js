const app = require('express')()
const config = require('./config.json')
const securityManager = require('./securitymanager').instance(config.dbpath)
const janitor = require('./janitor').instance( securityManager.numberOfUsers )

function login(user, password, res){
	securityManager.login(user, password, (id) => {
		res.json({ port: id >= 0 ? janitor.desk(id).newSession(config.dbpath) : 0 })
	} )
}

function closeSession(user, password){
	let id = securityManager.login(user, password)
	return id >= 0 ? janitor.desk(id).closeSession() : 0
}

app.get('/login/:user/:password', (req, res) => login(req.params.user, req.params.password, res) )
app.get('/closesession/:user/:password', (req, res) => res.json( closeSession(req.params.user, req.params.password) ) )

let port = config.port
app.listen(port, (err) => console.log(`Sik reception on port ${port} ...`))
