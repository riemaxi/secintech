let http = require('http')

class Manager{
	constructor(config){
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

	login(params, handle){
		let user = params.user
		let password = params.password
		this.request(`/access/find/${user}/${password}`, handle )
	}


	listKeys(params, handle){
		let user = params.user
		let password = params.password
		this.request(`/access/key/list/${user}/${password}`, handle )
	}


	listLinks(params, res){
		res.json({ response: 'links'})
	}

}

module.exports = Manager
