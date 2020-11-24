
class DBManager{
	constructor(service){
		this.service = service
	}

	lookupUser(user, password, handle){
		handle(user == 'u' && password == 'p')
	}

	lookupToken(token, handle){
		handle(true)
	}
}

module.exports = DBManager
