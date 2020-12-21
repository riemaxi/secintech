const express = require('express')
const app = express()

const fs = require('fs')

const port = 10001

class Console{
	constructor(root){
		this.root = root

		fs.readFile(this.root + "/index.html", (error, data) => {
			if(error) {
				throw error;
			}
				this.home = data.toString()
		});
	}
}

function instance(root){
	return new Console(root)
}

app.use( express.static('./html') )
app.get('/', (req, res) => res.send( webconsole.home ) )

app.listen(port, () => { console.log(`on port ${port} ...`) })
