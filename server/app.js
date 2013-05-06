var App=function(){
	var self=this;
	this.port=8080;
	
	var express = require('express');
	var app = express();
	
	app.get('/hello.txt', function(req, res){
	  var body = 'Hello World';
	  res.setHeader('Content-Type', 'text/plain');
	  res.setHeader('Content-Length', body.length);
	  res.end(body);
	});
	app.get('/hello2.txt', function(req, res){
	  res.send('Hello World 2');
	});
	app.listen(this.port);
	console.log('Listening on port ' + this.port);
}
	
var app=new App();
	