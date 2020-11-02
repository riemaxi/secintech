
class Matrix{
	constructor(defaultValue){
		this.defaultValue = defaultValue || 0 // == undefined?0:defaultValue
		this.data = new Map()
		this.maxpos = undefined
	}

	get(row, col){
		let value = this.data[row + "." + col]
		return value == undefined?this.defaultValue : value
	}

	set(row, col, value){
		this.data[row + "." + col] = value
	}
}

class Mapper{
	constructor(seqa, seqb, setting){
		this.match_factor = setting.match_factor
		this.match_threshold = setting.match_threshold

		this.gap_penalty = setting.gap_penalty
		this.mismatch_penalty = setting.mismatch_penalty
		this.match_reward = setting.match_reward

		this.seqa = seqa
		this.seqb = seqb
		this.setmatrix()

		this.print()

	}

	print(){
		for(var col=0; col < this.seqb.length; col++){
			var rowstr = ''
			for(var row =0; row<this.seqa.length; row++){
				rowstr += (' ' + this.matrix.get(row, col)).padStart(4)
			}
			console.log(rowstr)
		}
	}

	reward(a,b){
		if (this.distance(a,b) == 0)
			return this.match_reward
		else
			return this.mismatch_penalty
	}

	setmatrix(){
		this.matrix = new Matrix()
		var maxscore = -Infinity
		for (var col = 0; col < this.seqb.length; col++)
			for(var row =0; row < this.seqa.length; row++){
				let a = this.seqa[row]
				let b = this.seqb[col]

				let score  = Math.max(this.matrix.get(row-1,col-1) + this.reward(a,b),
						this.matrix.get(row-1,col) + this.gap_penalty,
						this.matrix.get(row,col-1) + this.gap_penalty,
						0 )

				this.matrix.set(row, col, score)
				if (score > maxscore){
					maxscore = score
					this.matrix.maxpos = {row: row, col: col}
				}
			}
	}

	end(row, col){
		return this.matrix.get(row, col) == 0
	}

	distance(row, col){
		let a = this.seqa[row]
		let b = this.seqb[col]
		return a == b?1:0
	}

	maxdir(row, col){
		var dir = {drow: -1,dcol: -1}
		var max = this.matrix.get(row-1, col-1)
		if (this.matrix.get(row,col-1) > max){
			dir = {drow: 0,dcol: -1}
			max = this.matrix.get(row, col-1)

		}

		if (this.matrix.get(row-1, col) > max){
			dir = {drow: -1,dcol: 0}

		}

		return dir
	}

	score(){
		var row = this.matrix.maxpos.row
		var col = this.matrix.maxpos.col
		var enda = this.matrix.maxpos.row
		var endb = this.matrix.maxpos.col

		var scr = 0
		var count = 0
		while (!this.end(row, col)){
			let di = this.distance(row, col)
			scr += di + this.match_threshold

			let dir = this.maxdir(row, col)

			row += dir.drow
			col += dir.dcol
			count++
		}

		return scr
	}
}

exports.map = function(a,b, setting){
	let mapper = new Mapper(a,b,setting)

	return mapper.score()
}

exports.mine = function(data, challenge){
	//insert data
	//using challenge.mutation
	//starting pow = 0
	//	apply mapping of challenge.sequence until score <= shallenge.score 
	//	(incr pow on each iteration)
	//	geneate a hash on every iteration using pow + timestamp + data
	//update the blockchain with (pow, timestamp, data, hash)
	//return pow
}
