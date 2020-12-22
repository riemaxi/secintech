const config = require('./config.json')
const Manager = require('./manager')

let mgr = new Manager(config)

let acl = [
	{user: 1, key: 1},
	{user: 1, key: 2},
	{user: 2, key: 3},
	{user: 2, key: 4},
	{user: 3, key: 5}
]


mgr.sikLogin(token  => {
	acl.forEach(acc => {
		mgr.addactivekey(token, acc,	{
					send(data){
						console.log('key added: ', data)
					}
				})
	})
})

