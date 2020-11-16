let app = require('express')()
let config = require('./config')
let SQLManager = require('./sqlmanager')
let Mapper = require('./mapper')

const crypto = require('crypto')

let sql = new SQLManager(config.dbpath)

function sha256(data){
	return crypto.createHash('sha256').update(data).digest('base64')
}


function blockchainHash(block, data, consume){
	sql.collection(`select hash from block where rowid = ${block}`, (item) => consume(sha256(item.hash + data)))
}

function addBlockAndItem(prevBlock, item, handle){
	blockchainHash(prevBlock, item.data, (hash) => {
		sql.insert('block','hash',`'${hash}'`, handle('block and item added'), () =>{
			addItem(prevBlock + 1, item, consume)
		})
	} )
}

function blockHash(block, consume){
	var data = ''
	sql.collectionToClosure(`select data from item where block = ${block}`, 
		(item) => data += item.data,
		() => consume(sha256(data) ) )
}


function addItem(block, item, consume){
	console.log('add item')
 	sql.insert(
		'item',
		'block,data',
		`${block}, '${item.data}'`, (error) => {
			blockHash(block, (hash) => {
				console.log('new block hash: ' + hash)
				sql.exec(`update block set hash = '${hash}' where rowid = ${block}`, consume('item added'))
			})
		})
}

function checkLastBlock(newitem, consume){
	sql.collection('select max(rowid) id from block', (blockitem) => {
		sql.collection(`select count(*) size from item where block = ${blockitem.id}`, (item) => {
			if (item.size < config.block_capacity)
				addItem(blockitem.id, newitem, consume)
			else
				addBlockAndItem(blockitem.id, newitem, consume)
		})
	})
}

function mine(item, pattern, start, end, res){
	//count the items in the last block select max(rowid) from block , select count(*) from item where block = lastblock
	// if count < config.capacity add the item else create new block and add item to "lastblock"
	// calculate hash using the hash of the previous block 
	//
	//challenge
	//concat the data from block start to block end into segment
	//search pattern in segment
	//res.json(score, blix)

	let reference = '000AAABBFFF0010001FFABCDAAA'

	let mapper = new Mapper(pattern, reference, (a,b) => {
	  let m = ['09','98','87', '76','65','54','43','4E','32','3E','21','CD','CF','DF','DE']
	  if (a == b)
	     return 1

	  if (a+''+b in m || b+''+a in m)
	    return .5

	  return 0
	})

}

function domining(powr, item, pattern, start, end, res){
	if (powr >= config.pow_rate){
		mine(item, pattern, start, end, res)
	}else
		res.json({ response: '-1000'})
}

item = {
	data: sha256(new Date().getTime() + '')
}

checkLastBlock(item, (msg) => {
	console.log(msg)
})

/*
app.get('/mine/:powr/:item/:pattern/:start/:end', (req, res) => domining(req.params.item, req.params.pattern, req.params.start, req.params.end, res) )

let port = 17000

app.listen(port, () => {
	console.log(`on port ${port} ...`)
})
*/
