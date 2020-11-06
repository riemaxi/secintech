const app = require('express')()
const sik = require('./sik').instance()

app.get('/check', (req, resp) => resp.json(sik.check()))
app.get('/newkey/:user/:contact/:access', (req, res) => res.json( sik.newkey( req.params ) ))
app.get('/getkey/:user/:access', (req, res) => res.json( sik.getkey( req.params ) ))
app.get('/confirmkey/:user/:access', (req, res) => res.json( sik.confirmkey( req.params ) ))

let port = 10000
app.listen(port, (err) => console.log(`on port ${port} ...`))
