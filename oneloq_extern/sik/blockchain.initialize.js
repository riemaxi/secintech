const config = require('./config.json')
const constant = require('./constant.json')
const SQLManager = require('./sqlmanager')
const Blockchain = require('./blockchain')

class DBInitializer extends SQLManager{
	constructor(dbpath){
		super(dbpath)
	}

	initialize(){
		this.dropTables(['block','item'])

		this.createTable(
			'block',
			`hash varchar(${config.blockchainHashSize})`)

		this.createTable(
			'item',
			'time bigint,block int, type int, contract varchar(256), sender varchar(256), requester varchar(256), recipient varchar(256),  data text'
		)

		this.populate()

	}

	populate(){
		new Blockchain(this, config.blockchainCapacity).initialize('0123456789ABCDEF')

	}
}

new DBInitializer(config.blockchainDB)

