const app = require('express')()
const config = require('./config.json')
const securityManager = require('./securitymanager').instance()
const janitor = require('./janitor').instance( securityManager.numberOfUsers )

function login(user, password){
	let id = securityManager.login(user, password)
	return id >= 0 ? janitor.desk(id).newSession() : 0
}


app.get('/login/:user/:password', (req, res) => res.json( login(req.params.user, req.params.password) ))

let port = config.port
app.listen(port, (err) => console.log(`Sik reception on port ${port} ...`))
