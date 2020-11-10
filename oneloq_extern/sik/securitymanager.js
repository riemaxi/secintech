const DBManager = require('./dbmanager')

class SecurityManager{
	constructor(dbpath){
		this.db = new DBManager(dbpath)
	}

	get numberOfUsers(){
		//return sql.count('access')
		return 1
	}

	login(user, password, handle){
		let query = `select rowid as id from access where user = '${user}' and password = '${password}' union select -1 as id`
		this.db.collection(query, (item) => { handle(item.id) })
	}
}

function instance(dbpath){
	return new SecurityManager(dbpath)
}

exports.instance = instance
