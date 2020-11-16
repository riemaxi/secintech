let SQLManager = require('./sqlmanager')
let Mapper = require('./mapper')

function mine(item, pattern, start, end, res){

	//insert item (hash(256))
	//load reference from table
	let reference = '000AAABBFFF0010001FFABCDAAA'

	let mapper = new Mapper(pattern, reference, (a,b) => {
	  let m = ['09','98','87', '76','65','54','43','4E','32','3E','21','CD','CF','DF','DE']
	  if (a == b)
	     return 1

	  if (a+''+b in m || b+''+a in m)
	    return .5

	  return 0
	})

	console.log(mapper.scores())
	console.log(mapper.maxIndex)
}

mine('data','BBFFF00100')
