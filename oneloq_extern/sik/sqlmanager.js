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
		this.db.exec(`select count(rowid) from ${name}`, (rows, error) => handle(rows))
	}

	createTable(name, definition, handle){
		console.log(`create table ${name}(${definition})`)
		this.db.exec(`create table ${name}(${definition})`, handle )
	}

	insert(name, fields, item, handle){
		console.log(`insert into ${name}` )
		this.db.exec(`insert into ${name}(${fields}) values(${item})`, handle )


	}

	collection(query, collect){
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

module.exports = SQLManager
