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
			'time bigint,block int, int type, contract varchar(256), sender varchar(256), requester varchar(256), recipient varchar(256),  data text'
		)

		this.populate()

	}

	populate(){
		let bc = new Blockchain(this.dbpath)
	}
}

new DBInitializer(config.blockchainDB)

