const app = require('express')()
const port = 1000

//session
app.get('/check', (req, res) => res.json( {check : { responde: '0'}} ))

app.listen(port, () => console.log(`OLC session listening at port ${port}`) )
