let http = require('http')

class Manager{
	constructor(config){
		this.host = config.db.host
		this.port = config.db.port
		this.sik = config.sik
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

	addkey(params, res){ //'/addkey/:token/:owner/:start/:end/:type/:data/:txcontract/:txsender/:txrequester/:txrecipient'
		let token = params.token
		let owner = params.owner
		let start = params.start
		let end = params.end
		let type = params.type
		let data = params.data
		let contract = params.contract
		let sender = params.sender
		let requester = params.requester
		let recipient = params.recipient

		let path = `/addkey/${token}/${owner}/${start}/${end}/${type}/${data}/${contract}/${sender}/${requester}/${recipient}`
		this.request(this.sik.host, this.sik.port, path, (data) => res.send(data) )
	}

	listKeys(user, res){
		console.log('listKeys:', user)
		this.request(this.host, this.port, `/access/key/list/${user}`, (data)=>res.send(data) )
	}


	listLinks(params, res){
		res.json({ response: 'links'})
	}

}

module.exports = Manager
