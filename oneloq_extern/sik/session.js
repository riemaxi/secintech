const app = require('express')()
const DBManager = require('./dbmanager')

class Session{
	constructor(port, dbpath){
		this.db = new DBManager(dbpath)

		app.get('/check', (req, res) => res.json( this.check() ))

		app.get('/checkaccess/:start/:end/:type/:data',(req, res) =>  this.checkAccess(req.params, res)  )

		this.server = app.listen(port, () => console.log(`new session on ${port} ...`))
	}

	check(){
		return { response: 0 }
	}

	checkAccess(key, res){
		this.db.checkAccess(key, (exists) => res.json( {exists: exists}))
	}

	close(){
		this.server.close()
		console.log(this.server + '... closing')
		return { close : 0 }
	}
}

module.exports = Session
