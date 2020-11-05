const acdmanager = require('./device/acdmanager').instance()
const olsmanager = require('./device/olsmanager').instance()
const sadmanager = require('./device/sadmanager').instance()

class Manager{
	constructor(){
	}

	check(){
		return {
				acdmanager: acdmanager.check(),
				olsmanager: olsmanager.check(),
				sadmanager: sadmanager.check()
			}
	}
}

function instance(){
	return new Manager()
}

exports.instance = instance
