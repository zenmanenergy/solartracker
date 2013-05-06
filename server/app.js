var App=function(){
	var self=this;
	this.port=8069;
	this.name='ZombieTag';
	
	var express = require('express');
	var mySQLClient = require('./mySQLClient.js');
	
	
	var app = express.createServer();
	
	app.configure(function() {
	    app.use(express.static(__dirname + "/public"));
	    app.set('views', __dirname);
	    app.set('view engine', 'ejs');
	});
	app.get('/', function(req, res) {
	    res.render('index', { layout: false });
	});
	app.listen(this.port);
	
	
	var wsServer = new WebSocketServer({
	    httpServer: app,
	    
	    // Firefox 7 alpha has a bug that drops the
	    // connection on large fragmented messages
	    fragmentOutgoingMessages: false
	});
	var games={}
	var players={}
	var boundaries=new Boundaries(mySQLClient);
	
	var connections = {};
	var connectionIDCounter = 1000;
	var broadcastHistory=[];
	
	console.log("Zenman Server ready");
}
	
var app=new App();
	