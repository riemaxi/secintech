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
		this.request('/data', (response) => res.json(response))
	}

	db.checkAccess(req.params, res){
	}

	addKey(req.params, res){
	}

	updateKey(req.params, res){
	}

	confirmKey(req.params, res){
	}

	deactivateKey(req.params, res){
	}
}

module.exports = DBManager
