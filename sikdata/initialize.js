const sql = require('sqlite3').verbose()

const dbpath = './db/data.db'

const transactionTable = `create table tx(
id DATETIME DEFAULT CURRENT_TIMESTAMP primary key, 
contract bigint,
source varchar(255),
recipient varchar(255),
data text
)`

const contractTable = `create table contract(
id DATETIME DEFAULT CURRENT_TIMESTAMP primary key,
type varchar(255),
start datetime,
end datetime,
data text
)`


const db = new sql.Database(dbpath, (error) => {
	if (!error){
		console.log(`${dbpath} created`)
	}
})

//Transactions
db.exec(transactionTable, (error) => {
	if (error){
		console.log(error + ' transaction')
	}
	else{
		console.log('transaction created')
	}
})

//Contract
db.exec(contractTable, (error) => {
	if (error){
		console.log(error + ' contract')
	}
	else{
		console.log('contract created')
	}
})

db.close((error) => {
	if (!error){
		console.log(`${dbpath} closed`)

	}
})
