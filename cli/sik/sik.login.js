let config = require('./config.json')
let manager = require('./manager').instance(config)

manager.sikLogin(config.sikuser, config.sikpassword, (res) => console.log('sik login: ' + res + '\n'))
