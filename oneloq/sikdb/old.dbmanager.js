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
     console.log('popUser:' + this.superuser)
    this.insert('access','user, password',`'${this.superuser}','${this.superpassword}'`)

    this.collection('select * from access', (item) => {
      console.log(item)
    })
  }

  initializeData(){
    this.dropTables(['key','access','contract'])

    this.createTable(
      'access',
      'user varchar(256), password varchar(256)')

    this.createTable(
      'key',
      'owner varchar(256), start unsigned big int, end unsigned big int, type bigint, data text, status int')

    this.createCleanTable(
      'contract',
      'id varchar(256) primary key,signed unsigned big int, start unsigned big int, end unsigned big int,   parta varchar(256), partb varchar(256), type varchar(256), price varchar(256), parameters text, procedure text'
    )

    this.populateUsers()
  }

   reset(res){
	this.transaction(['delete from block','delete from item'], (result) => res.json(result))
  }

	accessLookup(params, res){
		let user = params.user
		let password = params.password
		let query  = `select count(*) size from access where user = '${user}' and password = '${password}'`
		this.collection( query, (item) => res.json({ response: item.size > 0 }) )
	}

	keyAdd(params, res){
		let owner = params.owner
		let start = params.start
		let end = params.end
		let type = params.type
		let data = params.data
		let status = constant.key.status.INACTIVE

		this.insert('key','owner,start,end,type,data,status',`'${owner}',${start},${end},${type},'${data}',${status}`,
			(err)=>{
				this.mine(
					constant.tx.type.KEYADD,
					params,
					`${owner}|${start}|${end}|${type}|${data}|${status}`,
					() => res.json({ response: constant.key.response.status.OK})
				)
			})
	}

	oldkeyUpdateStatus(params, res){
		let owner = params.owner
		let deactivated = constant.key.status.DEACTIVATED

		this.collectionToClosure(`select * from key where owner = '${owner}' and status > ${deactivated}`, (item) => {

			let status = params.value
			this.exec(`update key set status = ${status} where owner = '${owner}' and status > ${deactivated}'`,
				(err)=>{
					let start = item.start
					let end = item.end
					let type = item.type
					let data = item.data

					this.mine(
						constant.tx.type.KEYUPDATE,
						params,
						`${owner}|${start}|${end}|${type}|${data}|${status}`,
						() => res.json({ response: constant.key.response.status.OK})
					)
				})
		},
		() => {},
	        ()=> res.json({ response: constant.key.response.status.NOTFOUND} ) )

	}

	keyUpdateStatus(params, res){
		let owner = params.owner
		let deactivated = constant.key.status.DEACTIVATED

		let status = params.value
		console.log(`keyUpdateStatus: update key set status = ${status} where owner = '${owner}' and status > ${deactivated}'`)

		this.exec(`update key set status = ${status} where owner = '${owner}' and status > ${deactivated}'`,
			(err)=>{

				this.collectionToClosure(`select * from key where owner = '${owner}' and status > ${deactivated}`, (item) => {
						let start = item.start
						let end = item.end
						let type = item.type
						let data = item.data

						this.mine(
							constant.tx.type.KEYUPDATE,
							params,
							`${owner}|${start}|${end}|${type}|${data}|${item.status}`,
							() => res.json({ response: constant.key.response.status.OK})
						)
				},
				() => {},
			        ()=> {} )

			})

	}


	keyLookup(params, res){
		let owner = params.owner
		let type = params.type
		let data = params.data
		let time = params.time
		let active = constant.key.status.ACTIVE
		let query = `select count(*) size from key where ${time} between start and end and owner = '${owner}' and type = ${type} and data = '${data} and status = ${active}'`
		this.collection(query, (item) => {
			this.mine(
				constant.tx.type.KEYLOOKUP,
				params,
				`${owner}|${time}|${type}|${data}`,
				()=> res.json({response: item.size > 0 })
			)
		})

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
