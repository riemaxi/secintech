const dbpath = './db/data.db'
const manager = require('./manager').manager(dbpath)

function populateItem(mgr){

	var idx = 0
	for (var i=0; i<=10; i++){
		let block = Math.floor(i / 100 + 1)
		idx  = (idx + 1) % 100
		let data = 'the data ' + i

		mgr.add({
			block: block,
			idx: idx,
			data: data
		}, (r, error) => {
			if (error)
				console.log('item: ' + error)
		})
	}

	mgr.collection((item) => {
		console.log(item)
	})

}

function populateBlock(mgr){

	for (var i=0; i<10; i++){
		let pow= 300
		let capacity = 100
		let  hash = '22ii8911'

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


populateBlock(manager.blockManager)

//populateItem(manager.itemManager)

manager.close()
