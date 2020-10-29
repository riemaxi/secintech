const app = require('express')()

const dbpath = './db/data.db'
const manager = require('./manager').manager(dbpath)

/*const port = 3000

app.get('/', (req, res) => res.json([]))

app.listen(port, () => console.log(`SecInKey listening at port ${port}`) )*/

txMgr = manager.txManager

for (var i=0; i<100; i++){
	let source= '111111 ' + i
	let recipient= '2222222 ' + i
	let data = 'the data ' + i
	let contract = 100 + i%100

	txMgr.add({
		contract: contract,
		source: source,
		recipient: recipient,
		data: data
	}, (tx, error) => {
		if (!error)
			console.log(`${tx} added`)
	})
}

txMgr.collection((item) => {
	console.log(item)
})

manager.close()
