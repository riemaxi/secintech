const DBManager = require('./dbmanager')

class Manager{
	constructor(dbpath){
		this.db = DBManager(dbpath)
	}

	checkAccess(key, handle){
		this.db.checkAccess(key, handle)
	}

	close(){
		this.db.close()
	}

}

module.exports = Manager
