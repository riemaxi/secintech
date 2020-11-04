const acd = require('./acd').instance()
const ols = require('./ols').instance()
const sad = require('./sad').instance()

class Manager{
	constructor(){
	}

	check(){
		return {
				acd: acd.check(),
				ols: ols.check(),
				sad: sad.check()
			}
	}
}

function instance(){
	return new Manager()
}

exports.instance = instance
