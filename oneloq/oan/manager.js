const data = require('./data.json')
const Channel = require('../common/channel')
const fs = require('fs')

class Manager extends Channel{

	constructor(config){
		super(config)
		this.connect(config.central.host, (ev) => this.handleCentral(ev))
	}

	handleCentral(ev){
		ev.source.send(ev.id == 'open'?'I am an OLS channel agent with adapter capabilities ...':'bye...')
		if (ev.id == 'msg')
			console.log(ev.data)
	}

	serialize(data){
		return	`{
	"ols" : ${JSON.stringify(data.ols)},
	"sad" :  ${JSON.stringify(data.sad)},
	"atd" : ${JSON.stringify(data.atd)},
	"sensor" :  ${JSON.stringify(data.sensor)},
	"topology" : ${JSON.stringify(data.topology)}
}`
	}

	save(){
		fs.writeFile('./data.json',  this.serialize(data), error => console.log(error?error:''))

	}

}

module.exports = Manager
