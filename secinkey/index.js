const app = require('express')()
const port = 3000

app.get('/', (req, res) => res.json([]))

app.listen(port, () => console.log(`SecInKey listening at port ${port}`) )
