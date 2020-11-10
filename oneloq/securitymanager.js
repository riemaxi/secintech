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

	check(){
		return { response: 0 }
	}

	checkAccess(port,owner, start, end, type, data, handle){
		let x = new Date().getTime()
		let uriData = encodeURIComponent(data)

		this.request(`/checkaccess/${x}/${owner}/${start}/${end}/${type}/${uriData}`, port, 
			(res) => handle(res) )
	}
}

module.exports = SecurityManager
