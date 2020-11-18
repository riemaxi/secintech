const Blockchain = require('./blockchain')
const config = require('./config.json')
const constant = require('./constant.json')
const SQLManager = require('./sqlmanager')

let bc = new Blockchain(new SQLManager(config.blockchainDB), config.blockCapacity)

bc.initialize('initial hash')

let item = {
	signed : new Date('2020-01-01T00:00:00').getTime(),
	start : new Date('2020-01-01T00:00:00').getTime(),
	end : new Date('2025-01-01T00:00:00').getTime(),
	parta : 'AAAAAAAAA',
	partb : 'BBBBBBBBB',
	price : '1:10-12:euro', //1 loqoin = 0.000 000 000 000 1 euros

	id : 'contract-0000',
	parameters : 'fields',
	procedure : 'sql : insert into contract'
}

bc.mine(
	constant.contract_type,
	'txt contract - 000',
	'sender 0000',
	'requester 0000',
	'recipient 000',
	JSON.stringify(item),
	(msg) => console.log(msg))
