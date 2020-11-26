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
	let host = 'localhost'
	let path = `/checkaccess/${token}/11111/222/2/data/1/1/1/1`
	let port = 5000
	console.log(path)
	request(host, path, port,(data) => res.json(data) )
}

function addkey(params, res){
	let host = 'localhost'
	let path = `/addkey/${token}/10/1200/23000/23/more/2/5/6/7`
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

function login(params, res){
	let host = 'localhost'
	let path = `/login/u/p`
	let port = 5000

	console.log('login ...')
	request(host, path, port,(data) => {
		token = JSON.parse(data).token
		res.json(token)
	})
}

app.get('/login', (req, res) => login(req.params, res))
app.get('/checkaccess', (req, res) => checkaccess(req.params, res))
app.get('/addkey', (req, res) => addkey(req.params, res))
app.get('/transactions', (req, res) => transactions(req.params, res) )

app.listen(config.port, () => console.log(`OLConsole on ${config.port}`) )
