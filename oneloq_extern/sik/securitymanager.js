const sql = require('sqlite3').verbose()

class SecurityManager{
	constructor(dbpath){
		//this.db = new sql.Database(dbpath)
	}

	isTokenValid(token){
		return  true
	}

	login(user, password){
		return user == 'u' && password == 'p'
	}
}

function instance(dbpath){
	return new SecurityManager(dbpath)
}

exports.instance = instance
