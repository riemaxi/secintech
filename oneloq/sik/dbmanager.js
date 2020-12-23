let http = require('http')
let constant = require('./constant.json')

class DBManager{
	constructor(config){
		this.config = config
		this.host = config.db.host
		this.port = config.db.port
	}

	request(path, handle){
		var result = ''
		let option = {
			host: this.host,
			port: this.port,
			path: path,
		}

		http.request(option,
		(res) => {
			res.on('data', (data) => result += data)
			res.on('end', ()=> handle(result))
		}).end()
	}

	createToken(data){
		return data.response == true? new Date().getTime() : 0
	}

	login(params, handle){
		this.request(`/access/lookup/${params.user}/${params.password}`, (data) => handle( this.createToken(JSON.parse(data)) ))
	}


	checkAccess(params, res){
		let contract = this.config.contract.standard
		let sender = this.config.id
		let recipient = this.config.client
		let requester = this.config.client

		this.request(`/key/lookup/${params.owner}/${params.id}/${params.time}/${contract}/${sender}/${requester}/${recipient}`, (data) => res.send(data) )
	}


	transactions(params, res){
		this.request(`/transaction/list/${params.limit}`, (data) => res.send(data))
	}

	keys(params, res){
		let contract = this.config.contract.standard
		let sender = this.config.id
		let recipient = this.config.client
		let requester = this.config.client

		this.request(`/key/list/${params.owner}/${contract}/${sender}/${requester}/${recipient}`, (data) => res.send(data))
	}


	addKey(params, res){
		this.request(`/key/add/${params.owner}/${params.id}/${params.start}/${params.end}/${params.type}/${params.data}/${params.txcontract}/${params.txsender}/${params.txrequester}/${params.txrecipient}/${params.status}`, (data) => res.json(data) )
	}

	confirmKey(params, res){
		let active = constant.key.status.ACTIVE
		this.request(`/key/update/status/${params.owner}/${params.id}/${active}/${params.txcontract}/${params.txsender}/${params.txrequester}/${params.txrecipient}`, (data) => res.json(data))
	}

	deactivateKey(params, res){
		let deactivated = constant.key.status.DEACTIVATED
		this.request(`/key/update/status/${params.owner}/${params.id}/${deactivated}/${params.txcontract}/${params.txsender}/${params.txrequester}/${params.txrecipient}`, (data) => res.json(data))
	}
}

module.exports = DBManager
