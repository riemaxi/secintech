let http = require('http')

class Manager{
	constructor(sikService){
		this.sikService = sikService
	}

	request(host, path, port, handle){
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


	sikData(params, res){
		let token = params.token
		request(this.sikService.host, 
			`/sik/data/${token}`, 
			this.sikService.port, (data) => res.json(data))
	}

	sikCheckAccess(params, res){
		let token = params.token
		let time = params.time
		let owner = params.owner
		let type = params.type
		let data = params.data
		request(this.sikService.host, 
			`/checkaccess/${token}/${time}/${owner}/${type}/${data}`, 
			this.sikService.port, (data) => res.json(data))
	}

	sikAddKey(params, res){
		request(this.sikService.host,
			`/addkey/${params.data}`,
			this.sikService.port, (data) => res.json(data))
	}

	sikUpdateKey(params, res){
		request(this.sikService.host,
			`/updatekey/${params.data}`,
			this.sikService.port, (data) => res.json(data))
	}

	sikConfirmKey(params, res){
		request(this.sikService.host,
			`/confirmkey/${params.data}`,
			this.sikService.port, (data) => res.json(data))
	}

	sikDeactivateKey(params, res){
		request(this.sikService.host,
			`/deactivatekey/${params.data}`,
			this.sikService.port, (data) => res.json(data))
	}

}


module.exports = Manager
