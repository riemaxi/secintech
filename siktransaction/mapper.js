class Matrix{
	constructor(rows, cols){
		this.data = new Map()
		this.rows = rows
		this.cols = cols
		this.nullValue = ''
	}

	get(row, col){
		let value = this.data[row + "." + col]
		return value == undefined?this.nullValue : value
	}

	set(row, col, value){
		this.data[row + "." + col] = value
	}
}


class Mapper{
	constructor(seqa, seqb, setting){
		this.seqa = seqa
		this.seqb = seqb

		this.mismatchScore = setting.mismatchScore

		this.initmatrix()
	}

	print(){
		for(var row=0; row < this.seqb.length + 2; row++){
			var rowstr = ''
			for(var col =0; col < this.seqa.length + 2 ; col++){
				rowstr += (' ' + this.matrix.get(row, col)).padStart(5)
			}
			console.log(rowstr)
		}
	}

	initmatrix(){
		this.matrix = new Matrix(this.seqb.length + 2, this.seqa.length + 2)

		this.matrix.set(1,1,0)

		for(var col = 2; col < this.matrix.cols; col++){
			this.matrix.set(0, col, this.seqa[col - 2])
			this.matrix.set(1, col, this.mismatchScore * col + 1)
		}


		for(var row = 2; row < this.matrix.rows; row++){
			this.matrix.set(row, 0, this.seqb[row - 2])
			this.matrix.set(row, 1, this.mismatchScore * row + 1)
		}
	}

	similarity(a,b){
		return a==b?1:0
	}

	score(){
		var maxScore = this.matrix.get(1,1)
		for(var col = 2; col < this.matrix.cols; col++)
			for(var row = 2; row < this.matrix.rows; row++){
				let a = this.matrix.get(0, col)
				let b = this.matrix.get(row, 0)

				let matchScore = this.matrix.get(col-1, row-1 + this.similarity(a,b))
				let deleteScore = this.matrix.get(col-1, row) + this.mismatchScore
				let insertScore = this.matrix.get(col, row-1) + this.mismatchScore

				var currentScore = Math.max(matchScore, deleteScore, insertScore)

				this.matrix.set(row, col, currentScore)

				maxScore = Math.max( maxScore, currentScore)
			}

		return maxScore
	}
}


exports.map = function(seqa, seqb, setting){
	let mapper = new Mapper(seqa, seqb, setting)
	let score = mapper.score()

	mapper.print()

	return score
}
