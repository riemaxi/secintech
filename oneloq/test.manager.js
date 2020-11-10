const config = {
	sikhost: 'localhost',
	sikport: '20000',
	sikuser: 'u',
	sikpassword: 'p'
}

let manager = require('./manager').instance(config)

let owner = '202011178891AAF'
let start = '2020-11-01T00:00:00'
//let end = '2020-11-02T00:00:00'
let end = '2021-11-01T00:00:00'
let type = 0
let data = 'AAAAXXXFF'

let port = 30001

manager.checkAccess(port, owner, start, end, type, data, (res) => console.log('access: ' + res))
