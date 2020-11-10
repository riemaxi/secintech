const acdManager = require('./device/acdmanager').instance()
const olsManager = require('./device/olsmanager').instance()
const sadManager = require('./device/sadmanager').instance()
const SecurityManager = require('./securitymanager')

class Manager{
	constructor(sikhost, sikport){
		this.securityManager = new SecurityManager(sikhost, sikport)
	}

	check(){
		return {
				acdmanager: acdManager.check(),
				olsmanager: olsManager.check(),
				sadmanager: sadManager.check(),
				securitymanager: this.securityManager.check()
			}
	}

	sikLogin(user, password, handle){
		this.securityManager.login(user, password, handle)
	}

	checkAccess(port, start, end, type, data, handle){
		this.securityManager.checkAccess(port, start, end, type, data, handle)
	}

}

function instance(config){
	return new Manager(config.sikhost, config.sikport, config.sikuser, config.sikpassword)
}

exports.instance = instance
