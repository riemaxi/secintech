const app = require('express')()

app.get('/', (req, res) => res.send('hello OLSer ...') )

let port = 7000
app.listen(port, (err) => console.log(`OLS on ${port} ...`))
