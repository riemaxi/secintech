const sql = require('sqlite3').verbose()

class BlockManager{
	constructor(db){
		this.db =  db
	}

	add(b, result){
		let query = `insert into block(pow, capacity, hash) values(${b.pow}, ${b.capacity}, '${b.hash}' )`
		this.db.exec(query, (error) => result(b, error))
	}

	collection(collect){
		let query = 'select rowid, pow, capacity, hash from block'
		this.db.all(query, (error, rows) => {
			if (error)
				console.log(error)
			else
				rows.forEach( collect )
		})
	}

}


class ItemManager{
	constructor(db){
		this.db = db
	}

	add(i, result){
		let query = `insert into item(block, idx, data) values(${i.block}, ${i.idx}, '${i.data}' )`
		this.db.exec(query, (error) => result(i, error))
	}

	collection(collect){
		let query = 'select block, idx, data from item'
		this.db.all(query, (error, rows) => {
			if (error)
				console.log(error)
			else
				rows.forEach( collect )
		})
	}

}

class Manager{
	constructor(dbpath){
		this.db = new sql.Database(dbpath)

		this.blockManager = new BlockManager(this.db)
		this.itemManager = new ItemManager(this.db)
	}

	close(){
		this.db.close()
	}
}

function manager(dbpath){
	return new Manager(dbpath)
}

exports.manager = manager
