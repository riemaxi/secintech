const http = require('http')

class MiningManager{
	constructor(dbpath){
	}

	request(path, port, handle){
		var result = ''
		let option = {
			host: this.host,
			port: port,
			path: path,
		}

		http.request(option,
		(res) => {
			res.on('data', (data) => result += data)
			res.on('end', ()=> handle(result))
		}).end()
	}

	mineKeyOp(){
		//request(`/mine/`)
	}

	mineContractOp(){
		//mine con
	}

}
