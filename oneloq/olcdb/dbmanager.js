class DBManager{
	constructor(dbpath){
		this.initialize()
	}

	initialize(){
		this.users = [
			{id: 1, name: "lolita", type: "Tenant", password : "pass"},
			{id :2, name: "jossa", type: "Cleaning", password : "pass"},
			{id :3, name: "maria", type: "Tenant", password : "pass"}
		]

		this.keys = [ //retrieved from sik
			{id: 1, start: "2019-01-01T00:00:00", end: "2021-01-01T00:00:00", type:"T0", data:"access.garage", contract: "", sender:"", requester: "", active: true },
			{id: 2, start: "2019-01-01T00:00:00", end: "2021-01-01T00:00:00", type:"T1", data:"access.loby", contract: "", sender:"", requester: "", active: true },
			{id: 3, start: "2019-01-01T00:00:00", end: "2021-01-01T00:00:00", type:"T2", data:"access.main", contract: "", sender:"", requester: "", active: true },
			{id: 4, start: "2019-01-01T00:00:00", end: "2021-01-01T00:00:00", type:"T3", data:"access.office", contract: "", sender:"", requester: "", active: true },
			{id: 5, start: "2019-01-01T00:00:00", end: "2021-01-01T00:00:00", type:"T4", data:"access.backdoor", contract: "", sender:"", requester: "", active: true }
		]

		this.acl = [
			{user: 1, key: 1},
			{user: 1, key: 2},
			{user: 2, key: 3},
			{user: 2, key: 4},
			{user: 3, key: 5}
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

		this.topologies = [
			{id : 1, name : "labs"},
			{id: 2, name: "servers"},
			{id: 3, name: "others"}
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

	find(params, res){
		let user = this.users.find( item => item.name == params.user && item.password == params.password)
		res.json( { id: user?user.id:0 } )
	}

	link(id, res){
		let data = this.links.find( item => item.id == id)
		res.json({response : data})
	}

	linkDisplay(link){
		let topology =  this.topologies.find( item => item.id == link.topology)
		return	{
			id: link.id,
			a: link.a,
			b: link.b,
			status: link.status,
			topology: topology,
			data: link.data
		}
	}

	listLinks(res){
		res.json(
			{
				response: this.links.map(item => this.linkDisplay(item))
			})
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

	listKeys(params, res){
		let user = this.users.find(item => item.id == params.user)
		if (user){
			var keys = this.acl.filter(item => item.user == user.id)
			keys = keys.map( (item) => this.keys.find(key => key.id == item.key) )
			res.json( {keys:  keys })
		}
		else
			res.json( { keys: [] } )
	}

}

module.exports = DBManager
