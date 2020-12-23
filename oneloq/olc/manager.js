let http = require('http')

class Manager{
	constructor(config){
		this.host = config.db.host
		this.port = config.db.port
		this.sik = config.sik

		this.sikLogin( token => this.sikToken = token )
	}

	request(host, port, path, handle){
		var result = ''
		let option = {
			host: host,
			port: port,
			path: path,
		}

		http.request(option,
		(res) => {
			res.on('data', (data) => result += data)
			res.on('end', ()=> handle(result))
		}).end()
	}

	sikLogin(handle){
		let user = this.sik.login.user
		let password = this.sik.login.password
		this.request(this.sik.host, this.sik.port, 
				`/login/${user}/${password}`, 
				data => handle(JSON.parse(data).token) )
	}


	login(params, handle){
		let user = params.user
		let password = params.password
		this.request(this.host, this.port,`/access/find/${user}/${password}`, handle )
	}

	checkAccess(params, res){
		let user = params.user
		let key = params.key
		let time = new Date().getTime()
		let path = `/checkaccess/${this.sikToken}/${time}/${user}/${key}`
		this.request(this.sik.host, this.sik.port, path, (data) => res.send(data) )
	}

	lookupKey(user, key, handle){
		let path = `/access/key/lookup/${user}/${key}`
		this.request(this.host, this.port, path, handle)
	}

	addkey(token, params, res){ //'/addkey/:token/:owner/:start/:end/:type/:data/:txcontract/:txsender/:txrequester/:txrecipient'
		let user = params.user
		let key = params.key
		this.lookupKey(user, key, (resdata) => {
			let params = JSON.parse(resdata).key

			let start = params.start
			let end = params.end
			let type = params.type
			let data = params.data
			let contract = params.contract
			let sender = params.sender
			let requester = params.requester
			let recipient = params.recipient

			let path = `/addkey/${this.sikToken}/${user}/${key}/${start}/${end}/${type}/${data}/${contract}/${sender}/${requester}/${recipient}`
			this.request(this.sik.host, this.sik.port, path, (data) => res.send(data) )
		})

	}

	addactivekey(token, params, res){ //'/addactivekey/:token/:owner/:start/:end/:type/:data/:txcontract/:txsender/:txrequester/:txrecipient'
		let user = params.user
		let key = params.key
		this.lookupKey(user, key, (resdata) => {
			let params = JSON.parse(resdata).key

			let start = params.start
			let end = params.end
			let type = params.type
			let data = params.data
			let contract = params.contract
			let sender = params.sender
			let requester = params.requester
			let recipient = params.recipient

			let path = `/addactivekey/${this.sikToken}/${user}/${key}/${start}/${end}/${type}/${data}/${contract}/${sender}/${requester}/${recipient}`
			this.request(this.sik.host, this.sik.port, path, (data) => res.send(data) )
		})

	}


	listKeys(params, res){
		let user = params.user

		this.request(this.sik.host, this.sik.port, `/keys/${this.sikToken}/${user}`, (data)=>	res.send(data) )
	}


	listLinks(params, res){
		res.json({ response: 'links'})
	}

	listTransactions(params, res){
		let limit = params.limit
		let path  = `/transactions/${this.sikToken}/${limit}`
		this.request(this.sik.host, this.sik.port, path, (data) => res.send(data) )
	}

}

module.exports = Manager
