const Blockchain = require('./blockchain')
const config = require('./config.json')
const constant = require('./constant.json')
const SQLManager = require('./sqlmanager')

let bc = new Blockchain(new SQLManager(config.blockchainDB), config.blockCapacity)

function doMining(){
	console.log('mining ...')

	let item = {
		signed : new Date().getTime(),
		start : new Date('2020-01-01T00:00:00').getTime(),
		end : new Date('2025-01-01T00:00:00').getTime(),
		parta : 'part A ' + new Date().getTime(),
		partb : 'part B ' +  new Date().getTime() ,
		price : '1:10-12:euro', //1 loqoin = 0.000 000 000 000 1 euros

		id : 'contract-0000',
		parameters : 'fields',
		procedure : 'sql : insert into contract'
	}


	bc.mine(
		constant.contract_type,
		'txt contract - ' + new Date().getTime(),
		'sender ' + new Date().getTime(),
		'requester ' + new Date().getTime(),
		'recipient ' + new Date().getTime(),
		JSON.stringify(item),
		(msg) => console.log(msg))

	setTimeout(doMining, 2000)
}

setTimeout(doMining, 2000)
