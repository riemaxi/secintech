let app = require('express')()
let SQLManager = require('./sqlmanager')
let Mapper = require('./mapper')

function mine(item, pattern, start, end, res){

	//insert item (hash(256))
	//load reference from table
	let reference = ''

	let mapper = new Mapper(pattern, reference, (a,b) => {
	  let m = ['09','98','87', '76','65','54','43','4E','32','3E','21','CD','CF','DF','DE']
	  if (a == b)
	     return 1

	  if (a+''+b in m || b+''+a in m)
	    return .5

	  return 0
	})

}

app.get('/mine/:powr/:item/:pattern/:start/:end', (req, res) => mine(req.params.item, req.params.pattern, req.params.start, req.params.end, res) )

let port = 17000

app.listen(port, () => {
	console.log(`on port ${port} ...`)
})

