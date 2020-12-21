
class OLS{
	constructor(id){
		this.id = id
	}

	check(){
		return 0
	}
}

class OLSManager{
	constructor(){
	}

	devices(){
		return [
			new OLS(1000),
			new OLS(1001),
			new OLS(1002),
			new OLS(1003)
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
	return new OLSManager()
}

exports.instance = instance
