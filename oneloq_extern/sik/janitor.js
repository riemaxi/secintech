let app = require('express')()
const Session = require('./session')

class Desk{
	constructor(sessionPort){
		this.sessionPort = sessionPort
	}

	newSession(dbpath){
		this.session = new Session(this.sessionPort, dbpath)
		return this.sessionPort
	}

	closeSession(){
		this.session.close()
		delete this.session
	}
}

class Janitor{
	constructor(nou){
		this.initialPort = 30000
		this.desks = {}
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
