const app = require('express')()
const config = require('./config.json')
let port = config.port

app.listen(port, (err) => console.log(`Sik reception on port ${port} ...`))

app.get ('/sayhello', (req, res) => {
  res.send('Hello, Julio')
})
