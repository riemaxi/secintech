const DBManager = require('./dbmanager')
const MiningManager = require('./miningmanager')

// major types of operations: contract, key
// minor key op types : key-add, key-confirm, key-use, key-update(copy to new, deactivate)
// minor contract op types : contract-add, contract-update

class Manager{
	constructor(dbpath){
		this.db = new DBManager(dbpath)
		this.mmgr = new MiningManager(dbpath)
	}

	checkAccess(key, handle){
		this.db.checkAccess(key, (txnRecord) => {
			this.mmgr.mineKeyOp('key-use', txnRecord, handle)
		})
	}

	addKey(key, handle){
		this.db.addKey(key, (txnRecord) => {
			this.mmgr.mineKeyOp('key-add', txnRecord, handle)
		})
	}


	addContract(contract, handle){
			this.db.addContract(contract, (res) => {
		})
	}

	updateContract(contract, handle){
		this.db.updateContract(contract, (res) => {
			this.mmgr.mineContractOp(contract, handle)
		})
	}

	close(){
		this.db.close()
	}

}

module.exports = Manager
