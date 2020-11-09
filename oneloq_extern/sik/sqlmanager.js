const sql = require('sqlite3').verbose()


class SQLManager{
	constructor(dbpath){
		this.db = new sql.Database(dbpath)
		this.initialize()
	}

	initialize(){
	}

	insert(name, fields, item, handle){
		this.db.exec(`insert into table ${name}(${fields}) values(${item})`, 
				(error) => {
					if (!error && handle)
						handle(error)
				})
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

function instance(dbpath){
	return SQLManager(dbpath)
}

exports.instance = instance
