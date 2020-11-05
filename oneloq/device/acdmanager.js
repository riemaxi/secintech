
class ACD{
	constructor(id){
		this.id = id
	}

	check(atd){
		return 0
	}
}

class ATD{
	constructor(id){
		this.id = id
	}

	check(){
		return 0
	}
}

class ACDManager{
	constructor(){
	}

	devices(){
		return [
			{acd: new ACD(1000), atd: new ATD(3001)},
			{acd: new ACD(1001), atd: new ATD(3002)},
			{acd: new ACD(1002), atd: new ATD(3003)},
			{acd: new ACD(1003), atd: new ATD(3004)},
			{acd: new ACD(1004), atd: new ATD(3005)}
		]
	}

	deviceStatus(dev){
		return { status: dev.acd.id + '-' + dev.atd.id + ':' + dev.acd.check(dev.atd)}
	}

	check(){
		return this.devices().map( dev => this.deviceStatus(dev) )
	}
}

function instance(){
	return new ACDManager()
}

exports.instance = instance
