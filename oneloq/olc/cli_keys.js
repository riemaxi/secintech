const config = require('./config.json')
const Manager = require('./manager')

let mgr = new Manager(config)

let acl = [1,2,3]

mgr.sikLogin(token  => {
	acl.forEach(user => {

		mgr.listKeys({token : token, user: user}, {
					send(data){
						console.log(data)
					}
				})

	})
})

