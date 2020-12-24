const Channel = require('../common/channel')
const Adapter = require('./adapter')

class CustomChannel extends Channel{
	constructor(config){
		super(config)

		this.connect(config.central.host, (ws) => this.handleCentral(ws))
	}

	handleCentral(ws){
	}

}

module.exports = CustomChannel
