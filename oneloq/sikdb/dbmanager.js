const config = require('./config.json')
const SQLManager = require('../common/sqlmanager')

class DBManager extends SQLManager{
  constructor(dbpath){
    super(dbpath)
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
  }

  populateUsers(){
    this.insert('access','user, password',`'${config.superuser}','${config.superpassword}'`)

    this.collection('select * from access', (item) => {
      console.log(item)
    })
  }
}

module.exports = DBManager
