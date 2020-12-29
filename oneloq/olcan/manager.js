const fs = require('fs')
const Channel = require('../common/channel')
const af = require('./agent-factory')

class Manager extends Channel{

	constructor(config){
		super(config)
		this.olcHost = config.central.host
		this.load(config.data)
	}


	initializeAgents(){
		this.agents = {}

		this.data.ols.forEach(config => {
			this.agents[config.id] = af.create('ols', config)
		})

		this.data.sad.forEach(config => {
			this.agents[config.id] = af.create('sad', config)
		})

		this.data.acd.forEach(config => {
			this.agents[config.id] = af.create('acd', config)
		})

		this.data.atd.forEach(config => {
			this.agents[config.id] = af.create('atd', config)
		})

		this.data.sensor.forEach(config => {
			this.agents[config.id] = af.create('sensor', config)
		})

		this.connect(this.olcHost, (ev) => this.handleCentral(ev))

	}

	handleCommand(target, data, source){
		console.log('command', target, data)
		 this.agents[target].command(data, (r) => source.send(JSON.stringify(r)))
	}

	handleCentralMessage(source, msg){
		let data = JSON.parse(msg)

		switch(data.id){
			case 'greeting' : console.log('from OLC ... ', data.data); break
			case 'command' : this.handleCommand(data.target, data.data, source)
		}
	}

	handleCentral(ev){
		switch(ev.id){
			case 'open' :  ev.source.send('Adapter capabilities'); break
			case 'close' : ev.source.send('bye ...'); break
			case 'msg' : this.handleCentralMessage(ev.source, ev.data)
		}

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

	load(path){
		this.datapath = path
		fs.readFile(path, (error, data) => {
			console.log(error?error:'')

			this.data = error? {} : JSON.parse(data)

			this.initializeAgents()
		})
	}

	save(){
		fs.writeFile(this.datapath,  this.serialize(this.data), error => console.log(error?error:''))

	}

}

module.exports = Manager
