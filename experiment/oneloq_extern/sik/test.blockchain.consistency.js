const Blockchain = require('./blockchain')
const config = require('./config.json')
const constant = require('./constant.json')
const SQLManager = require('./sqlmanager')

let bc = new Blockchain(new SQLManager(config.blockchainDB), config.blockCapacity)

bc.checkConsistency((block, match) => console.log(`${block}: block ${match?"":"not"} consistent`) )
