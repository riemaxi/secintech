const config = require('./config.json')
const SQLManager = require('../common/sqlmanager')
const Blockchain = require('./blockchain')
const constant = require('./constant')

class DBManager extends SQLManager{
  constructor(dbpath){
    super(dbpath)

    this.bc = new Blockchain(this)
  }

  initialize(){
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
    this.populateKeys()
  }

  populateUsers(){
    this.insert('access','user, password',`'${config.superuser}','${config.superpassword}'`)

    this.collection('select * from access', (item) => {
      console.log(item)
    })
  }

  populateKeys(){
    for(var i =0; i<20; i++){
	let owner = 'owner ' + i
	let start = new Date('2020-01-01T00:00:00').getTime()
	let end = new Date('2025-01-01T00:00:00').getTime()
	let type = i % 4
	let data = 'data ' + i
	let status = constant.key.status.inactive
    	this.insert('key','owner,start, end, type, data, status',`'${owner}', ${start}, ${end}, ${type}, '${data}', ${status}`)
    }

    this.collection('select * from key', (item) => console.log(item))
  }
}

module.exports = DBManager
