class DBManager{
	constructor(dbpath){
		this.initialize()
	}

	initialize(){
		this.users = [
			{id: 1, name: "Lolita", type: "Tenant"},
			{id :2, name: "Jossa", type: "Cleaning"},
			{id :3, name: "Maria", type: "Tenant"},
			{id : 4, name: "Filiberto", type: "Operator"},
			{id: 5, name: "Johan",type: "Operator"},
			{id :6, name: "Anna",type: "Operator"},
			{id : 7, name: "Bacallao", type: "Operator"}
		]

		this.devices = [
			{id : 1,type: "Intercom",status: "Active", address: "192.168.10.100", description: "Storage room"},
			{id: 2, type: "Intercom",status: "OFFLINE",address: "192.168.10.101",description: "Meeting room"},
			{id: 3, type: "Access Control", status: "NOT APPROVED", address: "192.168.10.103", description: "Pantry"},
			{id: 4, type: "Intercom", status: "Active", address: "192.168.10.104" , description: "High Security"},
			{id: 5, type: "Intercom",status: "Active", address: "192.168.10.105", description: "Company entrance"},
			{id: 6,type: "Intercom",status: "Active", address:  "192.168.10.106", description: "Company main entrance"}
		]

		this.premises = [
			{id: "1",name: "Secintech Labs"},
			{id: 2, name: "Server Room"}
		]

		this.links = [
			{id: 1, a: 1, b: 2, status: 1, topology: 1, data: 'link 1'},
			{id: 2, a: 3, b: 6, status: 1, topology: 1, data: 'link 2'},
			{id: 3, a: 1, b: 4, status: 2, topology: 2, data: 'link 3'},
			{id: 4, a: 3, b: 5, status: 4, topology: 2, data: 'link 4'},
			{id: 5, a: 2, b: 6, status: 0, topology: 3, data: 'link 5'}
		]
	}

	user(id, res){
		let data = this.users.find( item => item.id == id)
		res.json({response : data})
	}

	link(id, res){
		let data = this.links.find( item => item.id == id)
		res.json({response : data})
	}

	listLinks(res){
		res.json({response: this.links})
	}


	listDevices(res){
		res.json({response: this.devices})
	}

	listUsers(res){
		res.json({response: this.users})
	}

	listPremises(res){
		res.json({response: this.premises})
	}


}

module.exports = DBManager
