const app = require('express')()

const dbpath = './db/data.db'

const session = require('./session').instance(dbpath)
const securityManager = require('./securitymanager').instance(dbpath)


function response(command,  req.params){

}

app.get('/login/:user/:password', (req, res) => res.json( securityManager.login(req.params.user, req.params.password) ))

app.get('/check/:token', (req, res) => res.json(sik.check()))

app.get('/newkey/:token/:user/:requester/:access', (req, res) => res.json( session.newkey( req.params ) ))
app.get('/getkey/:token/:user/:access', (req, res) => res.json( session.getkey( req.params ) ))
app.get('/confirmkey/:token/:user/:access', (req, res) => res.json( session.confirmkey( req.params ) ) )

let port = 10000
app.listen(port, (err) => console.log(`Sik reception on port ${port} ...`))
