const Blockchain = require('./blockchain')
const config = require('./config.json')
const SQLManager = require('./sqlmanager')

let bc = new Blockchain(new SQLManager(config.blockchainDB), config.blockCapacity)

bc.collection((item) => {
	console.log(item)
})

