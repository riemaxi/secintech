const config = require('./config.json')
const SQLManager = require('./sqlmanager')

class DBInitializer extends SQLManager{
	constructor(dbpath){
		super(dbpath)
	}

	initialize(){
		this.dropTables(['key','access'])

		this.createTable(
			'access',
			'user varchar(256), password varchar(256)')

		this.createTable(
			'key',
			'start varchar(21), end varchar(21), type bigint, data text')

		this.populateUsers()
		this.populateKeys()

	}

	populateUsers(){
		this.insert('access','user, password',"'u','p'")

		this.collection('select count(*) cnt from access', (item) => {
			console.log(`count: ${item.cnt}`)
			this.numberOfUsers = item.cnt
		})
	}

	populateKeys(){
		this.insert('key','start, end, type, data',"'2020-11-01T00:00:00','2021-11-01T00:00:00', 0,'AAAAXXXFF'")
		this.collection('select * from key', (item) => 	console.log(item) )
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
