const Channel = require('../common/channel')

class CustomChannel extends Channel{
	constructor(config){
		super(config)
	}

	handleConnection(ws){
		ws.send('welcome ...')
	}
}

module.exports = CustomChannel
