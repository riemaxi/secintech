const sql = require('sqlite3').verbose()

class SQLManager{
	constructor(dbpath){
		this.db = new sql.Database(dbpath)
		this.initialize()
	}

	initialize(){
	}

	dropTables(names){
		names.forEach(name => this.db.exec(`drop table if exists ${name}`) )
	}

	count(name, handle){
		this.db.exec(`select count(rowid) as cnt from ${name}`, (rows, error) => handle(rows.length))
	}

	createTable(name, definition, handle){
		console.log(`create table ${name}(${definition})`)
		this.db.exec(`create table ${name}(${definition})`, handle )
	}

	createCleanTable(name, definition, handle){
		console.log(`create table ${name}(${definition})`)
		this.db.exec(`create table ${name}(${definition}) without  rowid`, handle )
	}

	insert(name, fields, item, handle){
		console.log(`insert into ${name}` )
		this.db.exec(`insert into ${name}(${fields}) values(${item})`, handle )


	}

	_transaction(queries, handle){
		this.db.exec(	'BEGIN;' + queries.join(';') ,
				(error) => this.db.exec(error?'ROLLBACK;':'COMMIT;'))
	}

	transaction(queries, handle){
		let query = 'BEGIN;' +  queries.join(';') + ';COMMIT;'

		this.db.exec(	query,
				(error) => { if (error) this.db.exec('ROLLBACK;')} )
	}

	collection(query, collect, empty){
		this.db.all(query, (error, rows) => {
			if (error)
				console.log(error)
			else{
				if (rows.length > 0)
					rows.forEach( collect )
				else
					empty()
			}
		})
	}


	close(handle){
		this.db.close(handle)
	}
}

module.exports = SQLManager
