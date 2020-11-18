const http = require('http')
const Blockchain = require('./blockchain')

class MiningManager{
	constructor(dbpath){
		this.bc = new Blockchain(new M)
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

	mineKeyOp(opname, data, handle){
		this.bc.mine(type, contract, sender, requester, recipient, data, () => {})
		//challenge the miners request(`/mine/`)
		handle()
	}

	mineContractOp(opname, data, handle){
		//mine con
	}

}


module.exports = MiningManager
