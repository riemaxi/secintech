const Channel = require('../common/channel')

class CustomChannel extends Channel{
	constructor(config){
		super(config)

		this.connect(config.central.host, (ws) => this.handleCentral(ws))
	}

	handleCentral(ws){
		console.log(ws)
	}

}

module.exports = CustomChannel
