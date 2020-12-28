const Channel = require('../common/channel')

class OLSChannel extends Channel{
	constructor(config){
		super(config)
	}

	handleConnection(ws){
		this.agent = ws
		this.agent.send('welcome ...')
	}

	execute(command, target){
		this.agent.send({command: command, target: target})
	}
}

module.exports = OLSChannel
