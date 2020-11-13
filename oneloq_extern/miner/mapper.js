
class Mapper{
	constructor(pattern, reference){
		this.pattern = pattern
		this.reference = reference
	}

	score(idx){
		var s = 0
		for(var i=0; i<this.pattern.length; i++)
			s += this.distance(i, idx + i)

		return s / this.pattern.length
	}

	scores(){
		var list = []
		for(var i=0; i < this.reference.length - this.pattern.length + 1; i++)
			list[i] =  this.score(i)

		return list
	}

	distance(pi, ri){
		return this.pattern[pi] == this.reference[ri] ? 1 : 0
	}
}

class MetricMapper extends Mapper{
	constructor(pattern, reference, metric){
		super(pattern, reference)
		this.metric = metric
	}

	distance(pi, ri){
		let a = this.pattern[pi]
		let b = this.reference[ri]
		return this.metric(a,b)
	}

	scores(){
	   let list = super.scores()
           this.maxIndex = 0
           var max = list[0]
           for(var i=0; i<list.length;  i++)
             if (list[i] > max){
		max = list[i]
		this.maxIndex = i
	     }

	  return list
	}
}

module.exports = MetricMapper
