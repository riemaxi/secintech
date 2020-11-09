let app = require('express')()
const Session = require('./session')

class Desk{
	constructor(sessionPort){
		this.sessionPort = sessionPort
	}

	newSession(){
		new Session(this.sessionPort)
		return this.sessionPort
	}
}

class Janitor{
	constructor(nou){
		let initialPort = 30000
		this.desks = []
		for(var i=0; i<nou; i++){
			this.desks[i] = new Desk(initialPort + i)
		}
	}

	desk(id){
		return this.desks[id]
	}

}

function instance(nou){
	return new Janitor(nou)
}

exports.instance = instance
