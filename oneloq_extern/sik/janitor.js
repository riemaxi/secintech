let app = require('express')()
const Session = require('./session')

class Desk{
	constructor(sessionPort){
		this.sessionPort = sessionPort
	}

	newSession(dbpath){
		this.session = new Session(this.sessionPort, dbpath)
		return this.sessionPort + ':' + this.session.token
	}

	closeSession(){
		this.session.close()
	}
}

class Janitor{
	constructor(nou){
		this.initialPort = 30000
		this.desks = {}
	}

	closeSession(deskId){
		this.desk(deskId).closeSession()
		delete this.desks[deskId]
		console.log(deskId + ' deleted ...')
	}

	desk(id){
		var dsk = this.desks[id]

		if (!dsk)
			dsk = this.desks[id] = new Desk(this.initialPort + id)

		return dsk
	}
}

function instance(nou){
	return new Janitor(nou)
}

exports.instance = instance
