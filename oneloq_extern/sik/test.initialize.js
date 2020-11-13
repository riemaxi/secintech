const config = require('./test.config.json')
const SQLManager = require('./sqlmanager')

class DBInitializer extends SQLManager{
	constructor(dbpath){
		super(dbpath)
	}

	initialize(){
		this.dropTables(['key','access','txn','contract'])

		this.createTable(
			'access',
			'user varchar(256), password varchar(256)')

		this.createTable(
			'key',
			'owner varchar(256), start varchar(21), end varchar(21), type bigint, data text, active boolean')

		this.createCleanTable(
			'contract',
			'id varchar(256) primary key,signed varchar(21), start varchar(21), end varchar(21),   parta varchar(256), partb varchar(256), type varchar(256), price varchar(256), parameters text, procedure text'
		)

		this.createTable(
			'txn',
			'time bigint, contract varchar(256), sender varchar(256), requester varchar(256), recipient varchar(256),  data varchar(256)'
		)

		this.populateUsers()
		this.populateKeys()
		this.populateContracts()

	}

	populateUsers(){
		this.insert('access','user, password',"'u','p'")

		this.collection('select count(*) cnt from access', (item) => {
			console.log(`count: ${item.cnt}`)
			this.numberOfUsers = item.cnt
		})
	}

	populateKeys(){
		this.insert('key','owner, start, end, type, data, active',"'202011178891AAF','2020-11-01T00:00:00','2021-11-01T00:00:00', 0,'AAAAXXXFF', true")
		this.collection('select * from key', (item) => 	console.log(item) )
	}

	populateContracts(){
		let fields = 'id, signed, start, end,parta,partb,type,price, parameters, procedure'

		let signed = '2020-01-01T00:00:00'
		let start = '2020-01-01T00:00:00'
		let end = '2025-01-01T00:00:00'
		let parta = 'AAAAAAAAA'
		let partb = 'BBBBBBBBB'
		let price = 'x:10-12:euro' //x loqoins = 0.000 000 000 000 1 euros

		var id = 'contract-0000'
		var type = 'contract'
		var parameters = 'all fields'
		var procedure = 'sql : insert into contract'
		this.insert('contract',	fields,`'${id}','${signed}', '${start}', '${end}', '${parta}','${partb}', '${type}','${price}','${parameters}', '${procedure}'`)

		id = 'key-0000'
		type = 'key'
		parameters = 'all fields'
		procedure = 'sql : insert into key'
		this.insert('contract',	fields,`'${id}','${signed}', '${start}', '${end}', '${parta}',  '${partb}', '${type}',  '${price}', '${parameters}', '${procedure}'`)

		this.collection('select * from contract', (item) => 	console.log(item) )


	}

}

new DBInitializer(config.dbpath)


/*Block
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

function populateBlock(mgr, size, capacity){

	for (var i=0; i<size; i++){
		let pow= 0
		let  hash = ''

		mgr.add({
			pow: pow,
			capacity: capacity,
			hash: hash
		}, (r, error) => {
		})
	}

	mgr.collection((item) => {
		console.log(item)
	})

}

populateBlock(manager.blockManager, 10, 10)

db.close((error) => {
	if (!error){
		console.log(`${dbpath} closed`)

	}
})
*/
