const config = require('./config.json')
const SQLManager = require('./sqlmanager')

const crypto = require('crypto')

class DBInitializer extends SQLManager{
	constructor(dbpath){
		super(dbpath)

		this.previousBlockHash = this.sha256('block before the first')
	}

	initialize(){
		this.dropTables(['block','item'])

		this.createTable(
			'block',
			'hash varchar(256)')

		this.createTable(
			'item',
			'block bigint, data varchar(256)')

		this.populateBlocks()
		this.populateItems()

		this.updateHash()
	}

	populateBlocks(){
		this.insert('block','hash',"''")

		this.collection('select rowid, hash from block', (item) => {
			console.log(item.rowid)
		})
	}

	sha256(data){
		return crypto.createHash('sha256').update(data).digest('base64')
	}

	populateItems(){
		for(var i=0; i<config.block_capacity - 2; i++){
			let data = this.sha256(i + '')
			this.insert('item', 'block, data', `1, '${data}'`)
		}

		this.collection('select * from item', (item) => console.log(item))
	}

	updateHash(){
		//Concat the data of the items in the block 1
		var data = ''
		this.collectionToClosure('select data from item', (item) => {
			data += item.data
		}, () => {
			//update the hash of block 0
			let hash = this.sha256( this.previousBlockHash + data )
			this.exec(`update block set hash = '${hash}'`, ()=>{
					this.collection('select rowid, hash from block', (item) => console.log(item.rowid + ' , ' + item.hash ))
				})

		})

	}
}

new DBInitializer(config.dbpath)
