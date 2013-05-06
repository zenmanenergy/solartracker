var App=function(){
	var self=this;
	this.port=8080;
	this.name='ZenmanEnergy';
	
	var express = require('express');
	
	
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
	
	
	console.log("Zenman Server ready");
}
	
var app=new App();
	