const app = require('express')()
const mapper = require('./mapper')
const port = 3000

const setting = {
	matchScore : 1,
	mismatchScore : -1
}

console.log( mapper.challenge('AA00AA0','A0000A0', setting))

app.get('/', (req, res) => res.json([]))

app.listen(port, () => console.log(`SecInKey listening at port ${port}`) )
