const DBManager = require('./dbmanager')
const MiningManager = require('./miningmanager')
const config = require('./config.json')

// major types of operations: contract, key
// minor key op types : key-add, key-confirm, key-use, key-update(copy to new, deactivate)
// minor contract op types : contract-add, contract-update

class Manager{
	constructor(dbpath){
		this.db = new DBManager(dbpath)
		this.mmgr = new MiningManager(this.db, config.blockchainCapacity)
	}

	checkAccess(key, handle){
		this.db.checkAccess(key, (exist, txnRecord) => {
			handle(exist)
			this.mmgr.mineKeyOp('key-use', txnRecord, ()=>{})
		})
	}

	addKey(key, handle){
		this.db.addKey(key, (res, txnRecord) => {
			handle(res)
			this.mmgr.mineKeyOp('key-add', txnRecord, handle)
		})
	}


	addContract(contract, handle){
			this.db.addContract(contract, (res) => {
		})
	}

	updateContract(contract, handle){
		this.db.updateContract(contract, (res, txnRecord) => {
			handle(res)
			this.mmgr.mineContractOp(contract, txnRecord, handle)
		})
	}

	close(){
		this.db.close()
	}

}

module.exports = Manager
