const app = require('express')()
const port = 3000

app.get('/', (req, res) => res.send("Oneloq Central Admin Service"))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`) )
