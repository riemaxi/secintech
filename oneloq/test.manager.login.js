const config = {
	sikhost: 'localhost',
	sikport: '20000',
	sikuser: 'u',
	sikpassword: 'p'
}

let manager = require('./manager').instance(config)

manager.sikLogin(config.sikuser, config.sikpassword, (res) => console.log('sik login: ' + res + '\n'))
