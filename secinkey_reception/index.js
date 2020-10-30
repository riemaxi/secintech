const app = require('express')()
const port = 4000

//session
app.get('/login', (req, res) => res.json( {response : {data : 'login'}} ))

app.get('/logout', (req, res) => res.json( {response : {data : 'logout'}} ))

app.listen(port, () => console.log(`SecInKey desk session listening at port ${port}`) )
