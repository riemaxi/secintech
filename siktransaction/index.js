const app = require('express')()
const mapper = require('./mapper')
const port = 3000

const setting = {
	mismatchScore : -1
}

console.log( mapper.map('A00AAAAAAAAAA0','0AAAAABAAAA00000', setting))

app.get('/', (req, res) => res.json([]))

app.listen(port, () => console.log(`SecInKey listening at port ${port}`) )
