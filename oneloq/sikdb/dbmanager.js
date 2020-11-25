const SQLManager = require('../common/sqlmanager')
const Blockchain = require('./blockchain')
const constant = require('./constant')

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

	accessLookup(params, res){
		let user = params.user
		let password = params.password
		let query  = `select count(*) size from access where user = '${user}' and password = '${password}'`
		this.collection( query, (item) => res.json({ response: item.size > 0 }) )
	}

	keyLookup(params, res){
		let owner = params.ower
		let type = params.type
		let data = params.data
		let time = params.time
		let active = constant.key.status.active
		let query = `select count(*) size from key where ${time} between start and end and owner = '${owner}' and type = ${type} and data = '${data} and status = ${active}'`
		this.collection(query, (item) => res.json({ response: item.size > 0 }) )
	}

}

module.exports = DBManager
