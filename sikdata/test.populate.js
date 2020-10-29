const app = require('express')()

const dbpath = './db/data.db'
const manager = require('./manager').manager(dbpath)

function populateTransaction(mgr){

	for (var i=0; i<1000; i++){
		let source= '111111 ' + i
		let recipient= '2222222 ' + i
		let data = 'the data ' + i
		let contract = 100 + i%100

		mgr.add({
			contract: contract,
			source: source,
			recipient: recipient,
			data: data
		}, (r, error) => {
			if (!error)
				console.log(`${r} added`)
		})
	}

	mgr.collection((item) => {
		console.log(item)
	})

}

function populateContract(mgr){

	for (var i=0; i<100; i++){
		let type= i%4
		let start = '2020-01-01 10:10'
		let end = '2020-11-01 10:10'
		let data = 'contract ' + i

		mgr.add({
			type: type,
			start: start,
			end: end,
			data: data
		}, (r, error) => {
			if (!error)
				console.log(`${r} added`)
		})
	}

	mgr.collection((item) => {
		console.log(item)
	})

}


//populateTransaction(manager.txManager)

populateContract(manager.contractManager)

manager.close()
