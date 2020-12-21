let config = require('./config.json')
let manager = require('./manager').instance(config)

manager.sikLogout(config.sikuser, config.sikpassword, (res) => console.log(res))
