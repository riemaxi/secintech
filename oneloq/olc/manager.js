
let devices = {
	head : [{title: 'id'}, {title: 'type'}, {title: 'type'}, {title: 'status'}, { title: 'address'}, {title: 'description'}],
	tail: [

		['1','Intercom','Active','192.168.10.100', 'Storage room'],
	        ['2','Intercom', 'OFFLINE','192.168.10.101','Meeting room'],
            	['3', 'Access Control','NOT APPROVED', '192.168.10.103','Pantry'],
            	['4', 'Intercom','Active', '192.168.10.104' ,'High Security'],
	        ['5','Intercom','Active', '192.168.10.105','Company entrance'],
            	['6','Intercom','Active', '192.168.10.106','Company main entrance']
	]
}

let premises = [
	head: [],
	tail: []
]

   DeviceLocation("1","1"),
            DeviceLocation("2","1"),
            DeviceLocation("3","1"),
            DeviceLocation("5","1"),
            DeviceLocation("6","1"),
            DeviceLocation("4","2")

let deviceLocations = []

class Manager{
	constructor(){
	}

	devices(res){
		res.json(devices)
	}

	deviceLocations(handle){
		handle([
			{},
			{}
		])
	}
}

module.exports = Manager
