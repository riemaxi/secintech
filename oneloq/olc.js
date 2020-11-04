const sik = require('./sik').instance()
const sis = require('./sis').instance()


class OLC{
	constructor(){
	}

	check(){
		let sikcheck = sik.check().response
		let sischeck = sis.check().response
		let thischeck = sikcheck + sischeck

		return [
			{ sikresponse : sikcheck},
			{ sisresponse : sischeck},
			{ response : thischeck}
			]
	}
}

function instance(){
	return new OLC()
}

exports.instance = instance
