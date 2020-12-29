
class Agent{
	constructor(config){
		this.config = config
		this.id = config.id

		console.log(config ? config.name : 'error')
	}

	command(data, handle){
		console.log('handling command ...', data)
		handle({source: this.id, response: data})
	}
}


class OLSAgent extends Agent{
	constructor(config){
		super(config)
	}

	command(data, handle){
		super.command(data,handle)
	}
}

class SADAgent extends Agent{
	constructor(config){
		super(config)

	}

	command(data, handle){
	}

}


class ACDAgent extends Agent{
	constructor(config){
		super(config)
	}

	command(data, handle){
	}
}

class ATDAgent extends Agent{
	constructor(config){
		super(config)
	}

	command(data, handle){
	}

}


class SensorAgent extends Agent{
	constructor(config){
		super(config)
	}

	command(data, handle){
	}

}

function create(type, config){
	switch(type){
		case 'ols': return new OLSAgent(config)
		case 'sad': return new SADAgent(config)
		case 'acd' : return new ACDAgent(config)
		case 'atd' : return new ATDAgent(config)
		case 'sensor' : return new SensorAgent(config)
	}
	return new Agent(config)
}

exports.create = create

