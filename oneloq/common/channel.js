const ws = require('ws')
const WebSocketServer = ws.Server

class Channel{
	constructor(config){
		this.wss = new WebSocketServer({port : config.port}, () => this.initialize(config))
		this.wss.on('connection', ws => this.handleConnection(ws))
	}

	initialize(config){
		console.log(config.greeting.replace('$PORT', config.port))
	}

	handleConnection(ws){
		ws.on('message', message => this.handleMessage(message, ws))

		console.log('connection ...')
	}

	handleMessage(message, ws){
		console.log('message: ', message)
	}

	connect(host, handle){
		handle(host)
	}
}

module.exports = Channel
