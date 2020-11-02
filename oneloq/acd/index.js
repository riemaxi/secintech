const app = require('express')()
const port = 2000

//session
app.get('/check', (req, res) => res.json( {check : { responde: '0'}} ))

app.listen(port, () => console.log(`ACD session listening at port ${port}`) )
