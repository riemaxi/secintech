const express = require('express')
const app = express();
//const http = require('http').createServer(app);
const config = require('./config.json')
const http = require('http')

app.use(express.static('ui'))

var token = 0

function request(host, path, port, handle){
	var result = ''
	let option = {
		host: host,
		port: port,
		path: path,
	}

	http.request(option,
	(res) => {
		res.on('data', (data) => result += data)
		res.on('end', ()=> handle(result))
	}).end()
}



function checkaccess(params, res){
	let owner = params.owner
	let time = new Date().getTime()
	let host = 'localhost'
	let path = `/checkaccess/${token}/${time}/${owner}/3/5/1/6`
	let port = 5000
	console.log(path)
	request(host, path, port,(data) => res.json(data) )
}

function addkey(params, res){
	let owner = new Date().getTime()
	let start = new Date('2020-01-01T00:00:00').getTime()
	let end = new Date('2022-01-01T00:00:00').getTime()
	let host = 'localhost'
	let path = `/addkey/${token}/${owner}/${start}/${end}/23/more/2/5/6/7`
	let port = 5000
	console.log(path)
	request(host, path, port,(data) => res.json(data) )
}

function deactivateKey(params, res){
	let owner = params.owner

	let host = 'localhost'
	let path = `/deactivatekey/${token}/${owner}/2/5/6/7`
	let port = 5000
	console.log(path)
	request(host, path, port,(data) => res.json(data) )
}

function confirmKey(params, res){
	let owner = params.owner

	let host = 'localhost'
	let path = `/confirmkey/${token}/${owner}/2/5/6/7`
	let port = 5000
	console.log(path)
	request(host, path, port,(data) => res.json(data) )
}


function transactions(params, res){
	let host = 'localhost'
	let path = `/transactions/${token}/100`
	let port = 5000
	console.log(path)
	request(host, path, port,(data) => res.json(data) )
}

function siklogin(params, res){
	let host = 'localhost'
	let path = `/login/${params.user}/${params.password}`
	let port = 5000

	console.log('login ...')
	request(host, path, port,(data) => {
		token = JSON.parse(data).token
		res.json(token)
	})
}

function login(params, res){
	res.json({ granted: params.user=='filiberto@secintech.com' && params.password=='pass'})
}

app.get('/login/:user/:password', (req, res) => login(req.params, res))
app.get('/addkey', (req, res) => addkey(req.params, res))
app.get('/checkaccess/:owner', (req, res) => checkaccess(req.params, res))
app.get('/confirmkey/:owner', (req, res) => confirmKey(req.params, res))
app.get('/deactivatekey/:owner', (req, res) => deactivateKey(req.params, res))
app.get('/transactions', (req, res) => transactions(req.params, res) )

app.listen(config.port, () => console.log(`OLConsole on ${config.port}`) )
