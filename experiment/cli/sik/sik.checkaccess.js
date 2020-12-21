let config = require('./config')

let manager = require('./manager').instance(config)

let owner = 'NOTTHERE202011178891AAF'
//let owner = '202011178891AAF'
let type = 0
let data = 'AAAAXXXFF'

manager.sikLogin(config.sikuser, config.sikpassword, (res) => {

	let params = JSON.parse(res).port.split(':')
	let port = params[0]
	let token = params[1]
	console.log(port, token)

	manager.checkAccess(token, port, owner,type, data,(res) => {
		console.log('access: ' + res)
	})

	manager.sikLogout(config.sikuser,  config.sikpassword, (res) => {
		console.log(JSON.parse(res).data)
	})
})
