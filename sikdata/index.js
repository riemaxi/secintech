const app = require('express')()
const port = 3000

app.get('/', (req, res) => res.json(
	[
		{
			id: 1,
			name: 'sam'
		},
		{
			id: 2,
			name: 'mama'
		},
		{
			id: 3,
			name: 'lola'

		},
		{
			id: 1022,
			name: 'citizen z'
		}
	]
))

app.listen(port, () => console.log(`SecInKey listening at port ${port}`) )
