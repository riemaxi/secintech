
let DBManager = require('./dbmanager')
let config = require('./test.config.json')

let db = new DBManager(config.dbpath)

/*
		let keyQuery = `insert into key(owner,start, end, type, data, active) values('${k.owner}', '${k.start}', '${k.end'}, '${k.type}', '${k.data}', false)`

		let contract = k.contract
		let sender = k.owner
		let recipient = k.recipient
		let requester = k.requester
		let data = 'key-create'
		let txnQuery = `insert into txn(time, contract, sender, requester,recipient, data) values(NOW(), '${contract}', '${sender}','${requester}', '${recipient}','${data}' )`

*/

let key = {
	contract: 'key-0000',
	owner: '0000001',
    recipient: '0000002',
    requester: '0000003',
	start: '2020-01-01T00:00:00',
	end: '2025-01-01T00:00:00',
	type : 'acd',
	data : 'acd-0000'
}

db.addKey(key, (error) => console.log('error: ' + error) )

db.collection('select * from txn', (item) => console.log(item), ()=> console.log('none'))

db.close(()=> console.log('close...'))
