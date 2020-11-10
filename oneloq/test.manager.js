const config = {
	sikhost: 'localhost',
	sikport: '20000',
	sikuser: 'u',
	sikpassword: 'p'
}

let manager = require('./manager').instance(config)

//let owner = 'NOTTHERE202011178891AAF'
let owner = '202011178891AAF'
let type = 0
let data = 'AAAAXXXFF'

let port = 30001

manager.checkAccess(port, owner,type, data, (res) => console.log('access: ' + res))
