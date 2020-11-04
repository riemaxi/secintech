const app = require('express')()
const olc = require('./olc').instance()

const port = 10000

//session
app.get('/check', (req, res) => res.json( olc.check() ) )

app.listen(port, () => console.log(`Oneloq session listening at port ${port}`) )
