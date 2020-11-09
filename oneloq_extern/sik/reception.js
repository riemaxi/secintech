const app = require('express')()
const config = require('./config.json')
const securityManager = require('./securityManager').instance()
const janitor = require('./janitor').instance( securityManager.numberOfUsers )

function login(user, password){
	let id = securityManager.login(req.params.user, req.params.password)
	return janitor.desk(id).newSession()? id : 0
}


app.get('/login/:user/:password', (req, res) => res.json( login(req.params.user, req.params.password) ))

let port = config.port
app.listen(port, (err) => console.log(`Sik reception on port ${port} ...`))
