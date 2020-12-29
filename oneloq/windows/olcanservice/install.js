/*
first:

npm install -g node-windows
npm link node-windows

then:

node install.js
*/

var Service = require('node-windows').Service

// Create a new service object
var svc = new Service({
	name:'Node application as Windows Service',
	description: 'Node application as Windows Service',
	script: '<PATH TO OLCAN INDEX FILE>'
})

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', () =>  svc.start() )

svc.install()
