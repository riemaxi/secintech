const data = require('./data.json')
const Channel = require('../common/channel')

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

}

module.exports = Manager
