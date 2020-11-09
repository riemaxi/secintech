const SQLManager = require('./sqlmanager')
const config = require('./config.json')

class DBManager extends SQLManager{
	constructor(dbpath){
		super(dbpath)
	}

	initialize(){
		this.createTable(
			'access',
			'user varchar(256), password varchar(256)', 
			this.populateUsers(), 
			(error) => console.log(error))

		this.createTable(
			'key',
			'start varchar(21), end varchar(21), type varchar(255)',
			this.populateKeys(),
			(error) => console.log(error) )
	}

	populateUsers(){
		this.insert('access','user, password',"'u','p'", (error) => {
				this.numberOfUsers = 0
				mgr.collection('select * from access', (item) => {
					this.numberOfUsers++
				})
			}
		)
	}


	populateKeys(){
		this.insert('key','start, end, type',"'2020-11-01:00-00-00','2021-11-01:00-00-00','FF'", (error) => {
				this.numberOfUsers = 0
				mgr.collection('select * from key', (item) => {
					console.log(item)
				})
			}
		)
	}

	checkKey(key){
	}
}

let mgr = new DBManager(config.dbpath)

mgr.close()
