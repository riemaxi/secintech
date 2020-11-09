const app = require('express')()
const sql = require('sqlite3').verbose()

class Session{
	constructor(port){
		app.get('/check', (req, res) => res.json({ check: 0}))
		app.listen(port, () => console.log(`new session on ${port} ...`))
	}
}

module.exports = Session
