const http = require('http')

class SecurityManager{
	constructor(host, port){
		this.host = host
		this.port = port
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

	login(user, password, handle){
		this.request(`/login/${user}/${password}`, this.port,
				(res) => {
					handle(res)
				}
			)
	}

	logout(user, password, handle){
		this.request(`/logout/${user}/${password}`, this.port,
				(res) => {
					handle(res)
				}
			)

	}

	check(){
		return { response: 0 }
	}

	checkAccess(token, port,owner, type, data, handle){
		let x = new Date().getTime()
		let uriData = encodeURIComponent(data)

		console.log('checkaccess:' + port)
		this.request(`/checkaccess/${token}/${x}/${owner}/${type}/${uriData}`, port,
			(res) => handle(res) )
	}
}

module.exports = SecurityManager
