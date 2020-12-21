
class SAD{
	constructor(id){
		this.id = id
	}

	check(){
		return 0
	}
}

class SADManager{
	constructor(){
	}

	devices(){
		return [
			new SAD(1000),
			new SAD(1001),
			new SAD(1002),
			new SAD(1003)
		]
	}

	deviceStatus(dev){
		return { status: dev.id + ':' + dev.check()}
	}

	check(){
		return this.devices().map( dev => this.deviceStatus(dev) )
	}
}

function instance(){
	return new SADManager()
}

exports.instance = instance
