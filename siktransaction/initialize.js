const sql = require('sqlite3').verbose()

const dbpath = './db/data.db'

const db = new sql.Database(dbpath, (error) => {
	if (!error){
		console.log(`${dbpath} created`)
	}
})

//Block
const blockTable = `create table block(
id DATETIME DEFAULT CURRENT_TIMESTAMP primary key,
pow bigint,
hash varchar(255)
)`

db.exec(blockTable, (error) => {
	if (error){
		console.log(error + ' block')
	}
	else{
		console.log('block created')
	}
})

//Item
const itemTable = `create table item(
id DATETIME DEFAULT CURRENT_TIMESTAMP primary key,
block bigint,
data text
)`

db.exec(itemTable, (error) => {
	if (error){
		console.log(error + ' item')
	}
	else{
		console.log('item created')
	}
})


db.close((error) => {
	if (!error){
		console.log(`${dbpath} closed`)

	}
})
