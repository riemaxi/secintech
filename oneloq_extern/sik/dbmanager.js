const SQLManager = require('./sqlmanager')

// major types of operations: contract, key
// minor key op types : key-create, key-confirm, key-use, key-modify(copy to new, deactivate)
// minor contract op types : contract-create, contract-modify

class DBManager extends SQLManager{
	constructor(dbpath){
		super(dbpath)

	}

	checkAccess(k, handle){
		let query = `select start, end from key where owner = '${k.owner}' and type = ${k.type} and data = '${k.data}'`
		this.collection(query, (item) => {

			let start = Date.parse(item.start)
			let end = Date.parse(item.end)
			handle(start <= k.time && k.time <= end)

		}, () => handle(false) )

		//save in txn table
	}

	addKey(k, handle){
		let keyQuery = `insert into key(owner,start, end, type, data, active) values('${k.owner}', '${k.start}', '${k.end}', '${k.type}', '${k.data}', false)`

		k.time = new Date().getTime()
		let contract = k.contract
		let sender = k.owner
		let recipient = k.recipient
		let requester = k.requester
		let data = 'key-add'

		let txnQuery = `insert into txn(time, contract, sender, requester,recipient, data) values(${k.time}, '${contract}', '${sender}','${requester}', '${recipient}','${data}' )`

		this.transaction([keyQuery,txnQuery] , () => {
			handle(k)
		} )
	}
}

module.exports = DBManager
