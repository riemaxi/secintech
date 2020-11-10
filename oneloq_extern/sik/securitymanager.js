const SQLManager = require('./sqlmanager')

class SecurityManager{
	constructor(dbpath){
		//this.db = SQLManager(dbpath)
	}

	get numberOfUsers(){
		//return sql.count('access')
		return 1
	}

	login(user, password, handle){
		//this.db.lookup('access', {user: user, password: password}, (item) => handle(item.rowid) )
		return user == 'u' && password == 'p' ? 0 : -1
	}
}

function instance(dbpath){
	return new SecurityManager(dbpath)
}

exports.instance = instance
