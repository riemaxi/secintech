const sql = require('sqlite3').verbose()

class TransactionManager{
	constructor(db){
		this.db =  db
	}

	add(tx, result){
		let query = `insert into tx(contract, source, recipient, data) values(${tx.contract}, '${tx.source}', '${tx.recipient}', '${tx.data}' )`
		this.db.exec(query, (error) => result(tx, error))
	}

	collection(collect){
		let query = 'select * from tx'
		this.db.all(query, (error, rows) => {
			if (error)
				console.log(error)
			else
				rows.forEach( collect )
		})
	}

}


class ContractManager{
	constructor(db){
		this.db = db
	}

	add(c, result){
		let query = `insert into contract(type, start, end, data) values(${c.type}, '${c.start}', '${c.end}', '${c.data}' )`
		this.db.exec(query, (error) => result(c, error))
	}

	collection(collect){
		let query = 'select * from contract'
		this.db.all(query, (error, rows) => {
			if (error)
				console.log(error)
			else
				rows.forEach( collect )
		})
	}

	close(){
		this.db.close()
	}

}


class AccessManager{
	constructor(db){
		this.db = db
	}

	add(a, result){
		let query = `insert into access(type, start, end, data) values(${a.type}, ${a.start}, ${a.end}, '${tx.data}' )`
		this.db.exec(query, (error) => result(tx, error))
	}

	collection(collect){
		let query = 'select * from access'
		this.db.all(query, (error, rows) => {
			if (error)
				console.log(error)
			else
				rows.forEach( collect )
		})
	}
}

class UserManager{
	constructor(db){
		this.db = db
	}

	add(u, result){
		let query = `insert into user(name, password) values('${u.name}', '${u.password}' )`
		this.db.exec(query, (error) => result(tx, error))
	}

	collection(collect){
		let query = 'select * from tx'
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

		this.txManager = new TransactionManager(this.db)
		this.contractManager = new ContractManager(this.db)
		this.accessManager = new AccessManager(this.db)
		this.userManager = new UserManager(this.db)
	}

	close(){
		this.db.close()
	}
}

function manager(dbpath){
	return new Manager(dbpath)
}

exports.manager = manager

