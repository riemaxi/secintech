const app = require('express')()
const Manager = require('./manager')

class Session{
	constructor(port, dbpath){
		this.timeout = 10  //seconds
		this.token = new Date().getTime()

		this.mgr = new Manager(dbpath)

		app.get('/check', (req, res) => res.json( this.check() ))

		app.get('/checkaccess/:token/:time/:owner/:type/:data',(req, res) =>  this.checkAccess(req.params.token,req.params, res)  )

		this.server = app.listen(port, () => console.log(`new session on ${port} ...`))
	}

	check(){
		return { response: 0 }
	}

	timedOut(token){
		let current = new Date().getTime()
		return Math.abs(current - token) > this.timeout * 1000

	}

	checkAccess(token, key, res){
		if (this.timedOut(token)){
			res.json({ status: 'timedout'})
			close()
 		}
		else
			this.mgr.checkAccess(key, (exists) => res.json( {exists: exists, status : 'ok'}))
	}

	close(){
		if (this.server != null){
			this.mgr.close()
			this.server.close()

			console.log(this.server + '... closing')

			this.server = null
		}
		return { close : 0 }
	}
}

module.exports = Session
