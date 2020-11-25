let http = require('http')

class DBManager{
	constructor(host, port){
		this.host = host
		this.port = port
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


	data(params, res){
		//transacciones
		this.request('/transaction/list', (data) => res.json(data))
	}

	db.checkAccess(params, res){
		this.request(`/key/lookup/${params.user}/${params.password}`, (data) => res.json(data))
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
