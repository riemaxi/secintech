let Mapper = require('./mapper')

class BlixScanner{
	constructor(sql, pattern, start, end){
		this.sql = sql
		this.pattern = pattern
		this.start = start
		this.end = end
	}

	scan( handle ){
		this.loadStripe((stripe) =>{
			let mapper = new Mapper(this.pattern, stripe, this.mapperMetric)
			let scores = mapper.scores()
			handle(mapper.maxIndex, scores[mapper.maxIndex])
		})

	}
}


class Blockchain{
	constructor(sql){
		this.sql = sql
	}

	mine(item){
	}
}

module.exports = Blockchain
