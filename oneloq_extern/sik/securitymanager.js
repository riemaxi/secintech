const sql = require('sqlite3').verbose()

class SecurityManager{
	constructor(dbpath){
		//this.db = new sql.Database(dbpath)
	}

	get numberOfUsers(){
		return 1
	}

	login(user, password){
		return user == 'u' && password == 'p'? 0 : -1
	}
}

function instance(dbpath){
	return new SecurityManager(dbpath)
}

exports.instance = instance
