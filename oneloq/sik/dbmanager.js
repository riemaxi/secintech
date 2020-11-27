let http = require('http')
let constant = require('./constant.json')

class DBManager{
	constructor(config){
		this.host = config.host
		this.port = config.port
	}

	urlRequest(path, handle){
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
		this.urlRequest(`/access/lookup/${params.user}/${params.password}`, (data) => handle( this.createToken(JSON.parse(data)) ))
	}


	checkAccess(params, res){
		this.urlRequest(`/key/lookup/${params.owner}/${params.time}/${params.txcontract}/${params.txsender}/${params.txrequester}/${params.txrecipient}`, (data) => res.json(data) )
	}


	transactions(params, res){
		this.urlRequest(`/transaction/list/${params.limit}`, (data) => res.json(data))
	}


	addKey(params, res){
		this.urlRequest(`/key/add/${params.owner}/${params.start}/${params.end}/${params.type}/${params.data}/${params.txcontract}/${params.txsender}/${params.txrequester}/${params.txrecipient}`, (data) => res.json(data) )
	}

	confirmKey(params, res){
		let active = constant.key.status.ACTIVE
		this.urlRequest(`/key/update/status/${params.owner}/${active}/${params.txcontract}/${params.txsender}/${params.txrequester}/${params.txrecipient}`, (data) => res.json(data))
	}

	deactivateKey(params, res){
		let deactivated = constant.key.status.DEACTIVATED
		this.urlRequest(`/key/update/status/${params.owner}/${deactivated}/${params.txcontract}/${params.txsender}/${params.txrequester}/${params.txrecipient}`, (data) => res.json(data))
	}
}

module.exports = DBManager
