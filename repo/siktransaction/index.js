const app = require('express')()
const mapper = require('./mapper')
const port = 3000

const setting = {
	minScore: 2,
	matchScore : 1,
	mismatchScore : -1
}



let seqa = 'AA00AA0000000AAAAABAA00AA0000000AAAAABBAA00AA0000000AAAAABB'
let seqb = 'GGG0000FFAA00AA0000000AAAAABB'

console.log( mapper.challenge(seqa,seqb, setting))

app.get('/', (req, res) => res.json([]))

app.listen(port, () => console.log(`SecInKey listening at port ${port}`) )
