const app = require('express')()

//const dbpath = './db/data.db'
//const manager = require('./manager').manager(dbpath)

const port = 3000

app.get('/', (req, res) => res.json([]))

app.listen(port, () => console.log(`SecInKey listening at port ${port}`) )


