let app = require('express')()

class Session{
	constructor(port){
		app.get('/check', (req, res) => res.json({ check: 0}))
		app.listen(port, () => console.log(`new session on ${port} ...`))
	}
}

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
