let crypto = require('crypto')

class Blockchain{
	constructor(sql, config){
		this.sql = sql
		this.capacity = config.capacity
		this.hashSize = config.hashSize
		this.initialize()
	}

	initialize(){
		this.blocks = ['']
		this.items = []
	}

	sha256(data){
		return crypto.createHash('sha256').update(data).digest('base64')
	}

	blockchainHash(block, data, handle){
		handle( this.sha256( this.blocks[block] + data ) )

		//this.sql.collection(`select hash from block where rowid = ${block}`, (item) => handle(this.sha256(item.hash + data)))
	}

	blockHash(block, handle){
		var data = ''
		for(var i=0; i<this.items.length; i++)
			if (this.items[i].block == block)
				data += this.items[i].data
		handle(this.sha256(data))

		/*var data = ''
		this.sql.collectionToClosure(`select data from item where block = ${block}`,
			(item) => data += item.data,() => handle(this.sha256(data) ),
			()=>{} )*/
	}

	addItem(block,type, contract, sender, requester, recipient, data, handle){
		this.items.push({ 
				time: new Date().getTime() , 
				block: block,
				type : type,
				contract: contract,
				sender: sender,
				requester: requester,
				recipient: recipient,
				data: data })

		this.blockHash(block, (hash) => this.blocks[block] = hash)
		handle(0)

		/*console.log('add item')

		let time = new Date().getTime()

	 	this.sql.insert(
			'item',
			'time, block, type, contract, sender, requester, recipient, data',
			`${time}, ${block}, ${type}, '${contract}', '${sender}','${requester}','${recipient}', '${data}'`, (error) => {
				this.blockHash(block, (hash) => {
					console.log('new block hash: ' + hash)
					console.log(`update block set hash = '${hash}' where rowid = ${block}`)
					this.sql.exec(`update block set hash = '${hash}' where rowid = ${block}`, (err) => handle(err))
				})
			})*/
	}

	pack(type, contract, sender, requester, recipient, data){
		return `${type}${contract}${sender}${requester}${recipient}${data}`
	}

	addBlockAndItem(prevBlock, type, contract, sender, requester, recipient, data, handle){
		this.blockchainHash(prevBlock, this.pack(type, contract, sender, requester, recipient, data), (hash) => {
			this.blocks.push(hash)
			this.addItem(prevBlock + 1, type, contract, sender, requester, recipient, data, handle)
		} )

		/*this.blockchainHash(prevBlock, this.pack(type, contract, sender, requester, recipient, data), (hash) => {
			this.sql.insert('block','hash',`'${hash}'`, handle('block and item added'), () =>{
				this.addItem(prevBlock + 1, type, contract, sender, requester, recipient, data, handle)
			})
		} )*/

	}

	collection(limit, handle){
		for(var i=0; i<this.items.length; i++)
			handle(this.items[i])

		//this.sql.collection(`select * from item order by rowid desc limit ${limit}`, handle, ()=>{})
	}


	collectionToClosure(limit, handle, end, empty){
		if (this.items.length == 0)
			empty()
		else{
			for(var i=0; i<this.items.length; i++)
				handle(this.items[i])
			end()
		}

		//this.sql.collectionToClosure(`select * from item order by rowid desc limit ${limit}`, handle, end, empty)
	}

	lastHash(handle){
		handle(this.blocks[this.blocks.length - 1])

		//this.sql.collection('select max(rowid), hash from block', (item) => handle(item.hash))
	}

	checkConsistency(handle){
		for(var i=0; i<this.block.length; i++)
			this.blockHash(i, (calchash) => {
				handle(i, this.blocks[i] == calchash)
			})

		/*this.sql.collection('select rowid as id, hash from block order by id',
			(item) => {
				this.blockHash( item.id, (calchash) => {
					handle(item.id, item.hash == calchash)
				})
		})*/
	}

	reminding(){
		var c = 0;
		let block = this.blocks.length -1
		for(var i=0; i<this.items.length; i++)
			if (this.items[i].block == block)
				c++
		return c
	}

	mine(type, contract, sender, requester, recipient, data , handle){
		console.log('mining ...	')
		let lastblock = this.blocks.length - 1
		if (this.reminding() < this.capacity)
			this.addItem(lastblock, type, contract, sender, requester, recipient, data , handle)
				else
			this.addBlockAndItem(lastblock, type, contract, sender, requester, recipient, data, handle)


		/*this.sql.collection('select max(rowid) id from block', (blockitem) => {
			this.sql.collection(`select count(*) size from item where block = ${blockitem.id}`, (item) => {
				if (item.size < this.capacity)
					this.addItem(blockitem.id, type, contract, sender, requester, recipient, data , handle)
				else
					this.addBlockAndItem(blockitem.id, type, contract, sender, requester, recipient, data, handle)
			})
		})*/
	}
}

module.exports = Blockchain
