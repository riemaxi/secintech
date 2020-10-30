const app = require('express')()
const port = 5000

//session
app.get('/access/new', (req, res) => res.json( {response : {data : 'access/new'}} ))

app.get('/access/get', (req, res) => res.json( {response : {data : 'access/get'}} ))

app.get('/access/update', (req, res) => res.json( {response : {data : 'access/update'}} ))

app.get('/access/confirm', (req, res) => res.json( {response : {data : 'access/confirm'}} ))


app.listen(port, () => console.log(`SecInKey desk session listening at port ${port}`) )
