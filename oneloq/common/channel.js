const WebSocket = require('ws')
const WebSocketServer = WebSocket.Server

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
		ws.on('close', ()=> this.handleConnectionClosed(ws))

		console.log('connection ...')
	}

	handleConnectionClosed(ws){
		console.log('connection closed')
	}

	handleMessage(message, ws){
		console.log('message: ', message)
	}

	connect(host, handle){
		let ws = new WebSocket(host)
		ws.on('open', ()=>handle({id: 'open', source: ws}))
		ws.on('close', ()=>handle({id: 'close', source: ws}))
		ws.on('message', (message)=>handle({id: 'msg', source: ws, data : message}))
	}
}

module.exports = Channel
