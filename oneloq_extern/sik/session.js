const app = require('express')()
const sql = require('sqlite3').verbose()

class Session{
	constructor(port){
		app.get('/check', (req, res) => res.json( this.check() ))

		app.get('/checkaccess/:key',(req, res) => res.json( this.checkAccess(req.params.key) ) )

		this.server = app.listen(port, () => console.log(`new session on ${port} ...`))
	}

	check(){
		return { response: 0 }
	}

	checkAccess(key){
		return { response: 1 }
	}

	close(){
		this.server.close()
		console.log(this.server + '... closing')
		return { close : 0 }
	}
}

module.exports = Session
