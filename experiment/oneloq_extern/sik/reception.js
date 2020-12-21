const app = require('express')()
const config = require('./config.json')
const securityManager = require('./securitymanager').instance(config.dbpath)
const janitor = require('./janitor').instance( securityManager.numberOfUsers )

function login(user, password, res){
	securityManager.login(user, password, (id) => {
		res.json({ port: id >= 0 ? janitor.desk(id).newSession(config.dbpath) : 0 })
	} )
}

function logout(user, password, res){
	let id = securityManager.login(user, password, (id) => {
		if (id >= 0)
			 janitor.closeSession(id)
			res.json({ data: 'session ended'})
	})
}

app.get('/login/:user/:password', (req, res) => login(req.params.user, req.params.password, res) )
app.get('/logout/:user/:password', (req, res) => logout(req.params.user, req.params.password, res) )

let port = config.port
app.listen(port, (err) => console.log(`Sik reception on port ${port} ...`))
