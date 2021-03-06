const app = require('express')()
const Manager = require('./manager')

class Session{
	constructor(port, dbpath){
		this.timeout = 3600  //seconds
		this.token = new Date().getTime()

		this.mgr = new Manager(dbpath)
		console.log('new Manager')


		app.get('/check', (req, res) => res.json( this.check() ))

		app.get('/checkaccess/:token/:time/:owner/:type/:data',(req, res) =>  this.checkAccess(req.params.token,req.params, res)  )
		/*
		+app.get('/addkey/:token/:time/:owner/') -> status = inactive -> dashboard
		+app.get('/updatekey/:token/:time/:owner/') -> dashboard
		+app.get('/confirmkey/:token/:time/:owner/') // status = activate -> oneloq app
		+app.get('/deactivate/:token/:time/:owner/') // status = deactivated -> dashboard

		++app.get('/addcontract/:token/:time/owner/') -> dashboard
		app.get('/updatecontract/:token/:time/owner/')

		+app.get('/blockchain/key/:token/:time/:from/:limit/:criteria') //json format -> sik module
		+app.get('/blockchain/txn/:token/:time/:from/:limit/:criteria') //json format -> sik module
		++app.get('/blockchain/contract/:token/:time/:from/:limit/:criteria') //json format ->sik module
		app.get('/blockchain/:token/:time/:from/:limit/:criteria') //json format

		app.get('/blockchain/freesearch/:token/:time/:from/:limit/:criteria') //json format
		app.get('/blockchain/regexsearch/:token/:time/:from/:limit/:criteria') //json format
		*/

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
			//this.mgr.close()
			this.server.close()

			console.log(this.token + '... closing')

		}
		return { close : 0 }
	}
}

module.exports = Session
