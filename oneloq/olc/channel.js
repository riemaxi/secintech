const Channel = require('../common/channel')

class CustomChannel extends Channel{
	constructor(config){
		super(config)
	}
}

module.exports = CustomChannel
