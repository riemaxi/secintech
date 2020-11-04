const app = require('express')()
const sis = require('./sis').instance()
const sik = require('./sik').instance()
const manager = require('./manager').instance()

const port = 10000

function check(){
	let sikcheck = sik.check().response
	let sischeck = sis.check().response
	let olccheck = manager.check()

	return {
		sik: sikcheck,
		sis: sischeck,
		olc: olccheck
	}
}

//session
app.get('/check', (req, res) => res.json( check() ) )

app.listen(port, () => console.log(`Oneloq session listening at port ${port}`) )
