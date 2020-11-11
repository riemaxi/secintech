const SQLManager = require('./sqlmanager')

class DBManager extends SQLManager{
	constructor(dbpath){
		super(dbpath)
	}

	checkAccess(k, handle){
		let query = `select start, end from key where owner = '${k.owner}' and type = ${k.type} and data = '${k.data}'`
		this.collection(query, (item) => {

			let start = Date.parse(item.start)
			let end = Date.parse(item.end)
			handle(start <= k.time && k.time <= end)

		}, () => handle(false) )

	}
}

module.exports = DBManager
