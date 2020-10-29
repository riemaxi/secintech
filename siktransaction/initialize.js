const sql = require('sqlite3').verbose()

const dbpath = './db/data.db'

const db = new sql.Database(dbpath, (error) => {
	if (!error){
		console.log(`${dbpath} created`)
	}
})

//Block
db.exec('drop table if exists block')

const blockTable = `create table block(
pow bigint,
capacity int,
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
db.exec('drop table if exists item')

const itemTable = `create table item(
block bigint,
idx bigint,
data text,
primary key (block, idx)
) without rowid`

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
