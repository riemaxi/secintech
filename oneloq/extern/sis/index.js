
class SIS{
	constructor(){
	}

	check(){
		return { response: 0 }
	}
}

function instance(){
	return new SIS()
}

exports.instance = instance
