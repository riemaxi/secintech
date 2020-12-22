const SQLManager = require('../common/sqlmanager')
const Blockchain = require('./blockchain')
const constant = require('./constant.json')

class DBManager extends SQLManager{
  constructor(config){
    super(config.dbpath)

    this.superuser = config.superuser
    this.superpassword = config.superpassword

    this.bc = new Blockchain(this, config.blockchain)

    this.initializeData()
  }

  populateUsers(){
	this.users.push({ user: 'u', password : 'p'})
  }

  initializeData(){
    this.keys = []
    this.users = []
    this.contracts =  []

    this.populateUsers()
  }

   reset(res){
	this.bc.initialize()
  }

	accessLookup(params, res){
		let user = params.user
		let password = params.password
		let hit = this.users.find( e => e.user == user && e.password == password)
		res.json({ response: hit != null })
	}

	getkeys(params, res){
		let lst = this.keys.filter( key => key.owner == params.owner )
		res.json({ keys : lst?lst:[] })
	}

	keyAdd(params, res){
		let owner = params.owner
		let id = params.id
		let start = params.start
		let end = params.end
		let type = params.type
		let data = params.data
		let status = params.status

		this.keys.push({
			owner : owner,
			id: id,
			start : start,
			end : end,
			type : type,
			data : params.data,
			status : status
		})

		this.mine(
			constant.tx.type.KEYADD,
			params,
			`${owner}|${id}|${start}|${end}|${type}|${data}|${status}`,
			() => res.json({ response: constant.key.response.status.OK})
		)

	}

	keyUpdateStatus(params, res){
		let owner = params.owner
		let id = params.id
		let deactivated = constant.key.status.DEACTIVATED
		let status = params.value

		var item = this.keys.find(e => e.owner == owner && e.id == id)

		var txType = status == constant.key.status.ACTIVE ? constant.tx.type.KEYUPDATECONFIRMED : constant.tx.type.KEYUPDATEDEACTIVATED
		if (item == null || item.status == deactivated)
			txType = constant.tx.type.KEYUPDATEDENIED
		else
			if (item.status != deactivated)
				item.status = status

		let start = item!=null ? item.start : constant.EMPTY
		let end = item!=null ? item.end : constant.EMPTY
		let type = item!=null ? item.type : constant.EMPTY
		let data = item != null ? item.data : constant.EMPTY



		this.mine(
			txType,
			params,
			`${owner}|${id}|${start}|${end}|${type}|${data}|${item.status}`,
			() => res.json({ response: item != null ? constant.key.response.status.OK : constant.key.response.status.NOTFOUND})
		)
	}


	keyLookup(params, res){
		let owner = params.owner
		let id = params.id
		let time = params.time
		let active = constant.key.status.ACTIVE

		console.log(time, owner)
		let item = this.keys.find(e => e.owner == owner && e.id == id)

		let type = item != null?item.type:constant.EMPTY
		let  data = item != null?item.data:constant.EMPTY
		let  status = item != null?item.status:constant.EMPTY
		let  start = item != null?item.start:constant.EMPTY
		let  end = item != null?item.end:constant.EMPTY

		this.mine(
			item != null ? constant.tx.type.KEYLOOKUPFOUND : constant.tx.type.KEYLOOKUPNOTFOUND,
			params,
			`${owner}|${start}|${id}|${end}|${type}|${data}|${status}`,
			()=> res.json({response: start <= time && time <= end && status == active })
		)

	}

	transactions(params, res){
		//'time,block,type, contract, sender, requester, recipient,  data text')
		let data = {
			head : [{title:'Time'}, {title:'Type'}, {title:'Sender'}, {title:'Requester'}, {title:'Recipient'}, {title: 'Key/Contract Data'}],
			tail : []
		}
		this.bc.collectionToClosure(
			params.limit,
			(item) => data.tail.push([item.time, item.type, item.sender, item.requester, item.recipient,item.data]),
			()=> res.json(data),
			()=> res.json(data))
	}

	mine(txType, params, data, handle){
		this.bc.mine(
			txType,
			params.txcontract,
			params.txsender,
			params.txrequester,
			params.txrecipient,
			data,
			handle
		)
	}

}

module.exports = DBManager
