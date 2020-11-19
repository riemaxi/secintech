const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const Blockchain = require('./blockchain')
const config = require('./config.json')
const SQLManager = require('./sqlmanager')

let bc = new Blockchain(new SQLManager(config.blockchainDB), config.blockCapacity)

function dumping(res){
	var data = []
	bc.collectionToClosure(20, (item) => {
		data.push( [item.time, item.contract, item.sender, item.recipient] )
	}, 
	() =>res.json({header : ['time', 'contract', 'sender', 'recipient'], tail: data }),
	()=> res.json({header: ['time', 'contract', 'sender', 'recipient'], tail: []}) )
}


port = 50000

app.use(express.static('www'))

app.listen(port, () => {
	console.log(`dumping on ${port}`)
})


app.get('/', (req, res) => {
	res.sendFile(__dirname + '/www/index.html')
})

app.get('/data', (req, res) => dumping(res))

//dumping
function dump(){
	bc.collection(10, (item) => {
		io.emit('item', {data : '1000'})
	})

	setInterval(dump, 20000)
}

setInterval(dump, 2000)

io.on('connection', (socket) => {
  console.log('a user connected');
});
