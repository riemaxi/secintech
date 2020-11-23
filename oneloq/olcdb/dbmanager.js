const config = require('./config.json')
const SQLManager = require('../common/sqlmanager')

class DBManager extends SQLManager{
  constructor(dbpath){
    super(dbpath)
  }

  initialize(){
    this.dropTables(['access','device'])

     this.createTable(
       'device',
       'type varchar(256), status varchar(256), address varchar(256), data varchar(256)'
     )

    this.createTable(
      'access',
      'user varchar(256), password varchar(256)')

    this.populateUsers()
    this.populateDevices()
  }

  populateUsers(){
    this.insert('access','user, password',`'${config.superuser}','${config.superpassword}'`)

    this.collection('select * from access', (item) =>  console.log(item) )
  }

  populateDevices(){
	this.insert('device','type,status,address, data',"'ACD','NOT APPROVED','X.X.X.X','ACD 12'")
	this.insert('device','type,status,address, data',"'ACD','NOT APPROVED','X.X.X.X','ACD 25'")

	this.insert('device','type,status,address, data',"'ATD','NOT APPROVED','X.X.X.X','ATD 12'")

	this.insert('device','type,status,address, data',"'OLS','NOT APPROVED','X.X.X.X','OLS 25'")
	this.insert('device','type,status,address, data',"'OLS','NOT APPROVED','X.X.X.X','ACD 26'")

	this.insert('device','type,status,address, data',"'SAD','NOT APPROVED','X.X.X.X','SAD 25'")
	this.insert('device','type,status,address, data',"'SAD','NOT APPROVED','X.X.X.X','SAD 25'")
	this.insert('device','type,status,address, data',"'SAD','NOT APPROVED','X.X.X.X','SAD 25'")

    this.collection('select * from device', (item) =>  console.log(item) )

  }
}

module.exports = DBManager
