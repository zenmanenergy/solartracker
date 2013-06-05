var App=function(){
	var self=this;
	this.port=8080;
	
	var express = require('express');
	//var gpio = require("pi-gpio");
	var app = express();
	var fs = require('fs');
	
	app.get('/connect', function(req, res){
		console.log(req.headers.host)
		var settings={}
		settings.host=req.headers.host
		settings.datetime=new Date().toString()
		console.log(settings.datetime)
		fs.readFile("./settings.json", 'utf8', function (err, data) {
			if (err) {
				console.log('Error: ' + err);
				return;
			}
	 		data = JSON.parse(data);
	 		settings.longitude=data.longitude
			settings.latitude=data.latitude
			console.log(settings)
			var body = 'true';
			res.header("Access-Control-Allow-Origin", "*");
			res.contentType('application/json');
			res.json(settings);
		});
	  
	});
	app.get('/saveSettings', function(req, res){
		console.log(req.query)
		console.log(__dirname)
		fs.writeFile("./settings.json", JSON.stringify(req.query, null, 4), function(err) {
			if(err) {
				console.log(err);
			} else {
			console.log("JSON saved to ./settings.json");
			}
		}); 
	  //res.send('Hello World 2');
	});
	app.listen(this.port);
	console.log('Listening on port ' + this.port);
}
	
var app=new App();
	