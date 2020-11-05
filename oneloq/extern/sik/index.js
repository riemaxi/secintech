
class SIK{
	constructor(){
	}

	check(){
		return { response: 0 }
	}
}

function instance(){
	return new SIK()
}

exports.instance = instance
