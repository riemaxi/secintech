const sql = require('sqlite3').verbose()

class SIK{
	constructor(){
	}

	check(){
		return { response: 0 }
	}

	getkey(data){
		return { response : data}
	}

	newkey(data){
		return { response : data}

	}

	confirmkey(data){
		return { response : data }
	}
}

function instance(){
	return new SIK()
}

exports.instance = instance
