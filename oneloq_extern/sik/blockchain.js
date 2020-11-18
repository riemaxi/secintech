let SQLManager = require('./sqlmanager')
let crypto = require('crypto')

class Blockchain{
	constructor(sql, blockCapacity){
		this.sql = sql
		this.blockCapacity
	}

	hash256(data){
		return crypto.createHash('sha256').update(data).digest('base64')
	}

	blockHash(block, handle){
		var data = ''
		this.sql.collectionToClosure(`select data from item where block = ${block}`,
			(item) => data += item.data,() => handle(this.sha256(data) ) )
	}

	addItem(block,type, item, handle){
		console.log('add item')
	 	this.sql.insert(
			'item',
			'block,data',
			`${block}, '${item}'`, (error) => {
				this.blockHash(block, (hash) => {
					console.log('new block hash: ' + hash)
					this.sql.exec(`update block set hash = '${hash}' where rowid = ${block}`, handle('item added'))
				})
			})
	}

	addBlockAndItem(block, item, handle){
		this.blockchainHash(prevBlock, item, (hash) => {
			this.sql.insert('block','hash',`'${hash}'`, handle('block and item added'), () =>{
				this.addItem(prevBlock + 1, item, handle)
			})
		} )

	}

	collection(handle){
		this.sql.collection('select * from item', handle)
	}

	checkConsistency(handle){
	}

	mine(newitem, handle){
		this.sql.collection('select max(rowid) id from block', (blockitem) => {
			this.sql.collection(`select count(*) size from item where block = ${blockitem.id}`, (item) => {
				if (item.size < this.blockCapacity)
					this.addItem(blockitem.id, newitem, handle)
				else
					this.addBlockAndItem(blockitem.id, newitem, handle)
			})
		})
	}
}

module.exports = Blockchain
