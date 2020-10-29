const sql = require('sqlite3').verbose()

const dbpath = './db/data.db'

const db = new sql.Database(dbpath, (error) => {
	if (!error){
		console.log(`${dbpath} created`)
	}
})

//Transaction
db.exec('drop table tx')

const transactionTable = `create table tx(
contract bigint,
source varchar(255),
recipient varchar(255),
data text
)`

db.exec(transactionTable, (error) => {
	if (error){
		console.log(error + ' transaction')
	}
	else{
		console.log('transaction created')
	}
})

//Contract
db.exec('drop table contract')

const contractTable = `create table contract(
type int,
start datetime,
end datetime,
data text
)`

db.exec(contractTable, (error) => {
	if (error){
		console.log(error + ' contract')
	}
	else{
		console.log('contract created')
	}
})

//Access
db.exec('drop table access')

const accessTable = `create table access(
type int,
start datetime,
end datetime,
data text
)`

db.exec(accessTable, (error) => {
	if (error){
		console.log(error + ' access')
	}
	else{
		console.log('access created')
	}
})

//User
db.exec('drop table user')

const userTable = `create table user(
name varchar(255),
password varchar(255)
)`

db.exec(userTable, (error) => {
	if (error){
		console.log(error + ' user')
	}
	else{
		console.log('user created')
	}
})

db.close((error) => {
	if (!error){
		console.log(`${dbpath} closed`)

	}
})
