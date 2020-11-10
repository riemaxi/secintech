const SQLManager = require('./sqlmanager')

class DBManager extends SQLManager{
	constructor(dbpath){
		super(dbpath)
	}

	initialize(){
		this.dropTables(['key','access'])

		this.createTable(
			'access',
			'user varchar(256), password varchar(256)')

		this.createTable(
			'key',
			'start varchar(21), end varchar(21), type bigint, data text')

		this.populateUsers()
		this.populateKeys()

	}

	populateUsers(){
		this.insert('access','user, password',"'u','p'")

		this.collection('select count(*) cnt from access', (item) => {
			console.log(`count: ${item.cnt}`)
			this.numberOfUsers = item.cnt
		})
	}

	populateKeys(){
		this.insert('key','start, end, type, data',"'2020-11-01:00-00-00','2021-11-01:00-00-00', 0,'AAAAXXXFF'")
		this.collection('select * from key', (item) => 	console.log(item) )
	}

	checkAccess(k, handle){
		console.log(`dbmanager.checkAccess: ${k.start}`)
		console.log(`dbmanager.checkAccess: ${k.end}`)
		console.log(`dbmanager.checkAccess: ${k.type}`)
		console.log(`dbmanager.checkAccess: ${k.data}`)
		/*let params = key.split(':')
		let start = params[0]
		let end = params[1]
		let type = params[2]
		let data = params[3]*/

		/*let query = `select count(*) cnt from key where start = '${k.start}' and end = '${k.end}' and type = ${k.keytype} and data = '${k.data}}'`
		this.collection(query, (item) => handle(item.cnt > 0) )*/
		handle(1)
	}
}


module.exports = DBManager
