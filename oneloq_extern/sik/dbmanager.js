const SQLManager = require('./sqlmanager')

class DBManager extends SQLManager{
	constructor(dbpath){
		super(dbpath)
	}

	checkAccess(k, handle){
		let a = Date.parse(k.start)
		let b = Date.parse(k.end)
                let x = k.time

		if (a <= x && x <= b){
			let query = `select count(*) cnt from key where start = '${k.start}' and end = '${k.end}' and type = ${k.type} and data = '${k.data}'`
			this.collection(query, (item) => handle(item.cnt) )
		}
		else
			handle(false)
	}
}

module.exports = DBManager
