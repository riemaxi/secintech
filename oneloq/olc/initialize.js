const Manager = require('./manager')
const config = require('./config.json')

let mgr = new Manager(config)

let keys = [
	{id: 1, start: "2019-01-01T00:00:00", end: "2021-01-01T00:00:00", type:"T0", data:"access.garage", contract: "", sender:"", requester: "", active: true },
	{id: 2, start: "2019-01-01T00:00:00", end: "2021-01-01T00:00:00", type:"T1", data:"access.loby", contract: "", sender:"", requester: "", active: true },
	{id: 3, start: "2019-01-01T00:00:00", end: "2021-01-01T00:00:00", type:"T2", data:"access.main", contract: "", sender:"", requester: "", active: true },
	{id: 4, start: "2019-01-01T00:00:00", end: "2021-01-01T00:00:00", type:"T3", data:"access.office", contract: "", sender:"", requester: "", active: true },
	{id: 5, start: "2019-01-01T00:00:00", end: "2021-01-01T00:00:00", type:"T4", data:"access.backdoor", contract: "", sender:"", requester: "", active: true }
]

//'/addkey/:token/:owner/:start/:end/:type/:data/:txcontract/:txsender/:txrequester/:txrecipient'

mgr.sikLogin(token  => {

	keys.forEach(key => {
		mgr.addkey(token, key,	{
					send(data){
						console.log('key added: ', data)
					}
				})
	})

})

