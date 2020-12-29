const Channel = require('../common/channel')

class OLCANChannel extends Channel{
	constructor(config){
		super(config)
	}

	send(data){
		console.log('sending ...', data)
		this.agent.send(JSON.stringify(data))
	}

	handleConnection(ws){
		this.agent = ws
		this.send({id : 'greeting', data : 'welcome ...'})
		this.execute('command',1001, 'testing')
		this.agent.on('message', (msg) => console.log('OLCAN channel:on:message', msg))
	}

	handleMessage(message, source){
		console.log(message)
	}

	execute(id, target, data){
		this.send({id: id, target: target, data: data})
	}
}

module.exports = OLCANChannel
