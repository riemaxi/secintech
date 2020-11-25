let http = require('http')

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
		this.urlRequest(`/key/lookup/${params.owner}/${params.time}/${params.type}/${params.data}`, (data) => res.json(data) )
	}


	transactions(params, res){
		this.urlRequest('/transaction/list', (data) => res.json(data))
	}


	addKey(params, res){
	}

	updateKey(params, res){
	}

	confirmKey(params, res){
	}

	deactivateKey(params, res){
	}
}

module.exports = DBManager
