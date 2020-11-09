const sql = require('sqlite3').verbose()

class SQLManager{
	constructor(dbpath){
		this.db = new sql.Database(dbpath)
		this.initialize()
	}

	initialize(){
	}

	createTable(name, definition, handle){
		this.db.exec(`drop table if exists ${name}`)
		console.log(`create table ${name}(${definition})`)
		this.db.exec(`create table ${name}(${definition})`, handle )
	}

	insert(name, fields, item, handle){
		console.log(`insert into ${name}(${fields}) values(${item})`)
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
