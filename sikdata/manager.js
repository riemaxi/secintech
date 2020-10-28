const sql = require('sqlite3').verbose()

class TransactionManager:
	constructor(db){
	
	}


function createDB(){
	let db = new sql.Database(':memory:', (error)=>{
		if (!error){
			console.log('Manager connected')
		}
	})

	return db
}

function test(){
	let db = createDB()

	db.close((error)=>{
		if (!error){
			console.log('Manager closed')
		}
	})
}

exports.test = test
