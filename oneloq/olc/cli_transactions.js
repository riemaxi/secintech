const config = require('./config.json')
const Manager = require('./manager')

let mgr = new Manager(config)

mgr.sikLogin(token  => {
	mgr.listTransactions({token : token, limit: 100}, {
				send(data){
					console.log(data)
				}
			})
})

