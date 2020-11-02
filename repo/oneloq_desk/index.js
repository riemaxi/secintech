const app = require('express')()
const port = 3000

//session
app.get('/access/get', (req, res) => res.json( {response : {data : 'access/get'}} ))

app.get('/access/confirm', (req, res) => res.json( {response : {data : 'access/confirm'}} ))


app.listen(port, () => console.log(`Oneloq desk session listening at port ${port}`) )
