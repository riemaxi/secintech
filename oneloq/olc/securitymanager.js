
class DBManager{
	constructor(service){
		this.service = service
	}

	lookupUser(user, password, handle){
		handle(user == 'filiberto@secintech.com' && password == 'pass')
	}

	lookupToken(token, handle){
		handle(true)
	}
}

module.exports = DBManager
