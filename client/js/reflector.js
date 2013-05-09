function Reflector(canvasId){
	var self=this;
	self.canvas=document.getElementById(canvasId);
	self.context=self.canvas.getContext("2d");
	
	self.startX=self.canvas.width/2
	self.startY=self.canvas.height/2
	self.controlX1=130 
	self.controlY1=150
	self.controlX2=40
	self.controlY2=300
	self.endX=225
	self.endY=350
	self.lineWidth=1
	self.color="#FFFF00"
	self.canvasWidth=self.canvas.width
	self.canvasHeight=self.canvas.height
	self.type='reflector'
	self.setPointsParabola=function(a){
		self.x=new Array;
		self.y=new Array;
		
		for (var x = 1; x <= 100; x += 1) {
			console.log(x,Math.pow(x,2));
			self.x.push(x);
			self.y.push(Math.pow(x,2));
			
		}
	}
	self.setPoints=function(){
		var dy,dx,slope,intercept
			
		self.x=new Array;
		self.y=new Array;
		self.slopes=new Array;
		self.intercepts=new Array;
		
		for (var t = 0.01; t <= 1; t += 0.01) {
			self.x.push(Math.pow(1 - t, 3) * self.startX + 
				3 * t * Math.pow(1 - t, 2) * self.controlX1 +
				3 * Math.pow(t, 2) * (1 - t) * self.controlX2 +
				Math.pow(t, 3) * self.endX);
				
			self.y.push(Math.pow(1 - t, 3) * self.startY + 
				3 * t * Math.pow(1 - t, 2) * self.controlY1 +
				3 * Math.pow(t, 2) * (1 - t) * self.controlY2 +
				Math.pow(t, 3) * self.endY);
			//self.points.push(row)
		}
		for (var t = 0.01; t <= 1; t += 0.01) {
			self.x.push(Math.pow(1 - t, 3) * self.endX + 
				3 * t * Math.pow(1 - t, 2) * (self.canvasWidth-self.controlX2) +
				3 * Math.pow(t, 2) * (1 - t) * (self.canvasWidth-self.controlX1) +
				Math.pow(t, 3) * (self.canvasWidth-self.startX));
				
			self.y.push(Math.pow(1 - t, 3) * self.endY + 
				3 * t * Math.pow(1 - t, 2) * self.controlY2 +
				3 * Math.pow(t, 2) * (1 - t) * self.controlY1 +
				Math.pow(t, 3) * self.startY);
			//self.points.push(row)
		}
		for (var i = 0; i < self.x.length; i++) {
			if (i > 0){
				dy=self.y[i]-self.y[i-1];
				dx=self.x[i]-self.x[i-1];
				slope=dy/dx;
				self.slopes.push(slope)
				self.intercepts.push(self.y[i]-(slope*self.x[i]))
			}
		}
		
	}
	self.draw=function(){
		var x,y;
		var range=self.canvas.width
		var middle=range/2
		var tick=(self.canvas.width/10)
		self.context.lineWidth = 1;
		
		//draw cross at the center of the canvas
		self.context.beginPath();
		self.context.moveTo(0, self.canvas.height/2);
		self.context.lineTo(self.canvas.width, self.canvas.height/2);
		self.context.stroke();
		
		self.context.beginPath();
		self.context.moveTo(self.canvas.width/2, 0);
		self.context.lineTo(self.canvas.width/2,self.canvas.height);
		self.context.stroke();
		
		for( var i =0; i < 11; i++){
			self.context.beginPath();
			self.context.moveTo(i*tick, 0);
			self.context.lineTo(i*tick, self.canvas.height);
			self.context.strokeStyle = '#ff0000';
			self.context.stroke();
			
			self.context.beginPath();
			self.context.moveTo(0, i*tick);
			self.context.lineTo(self.canvas.width, i*tick);
			self.context.strokeStyle = '#ff0000';
			self.context.stroke();
		}
		
		x0=range/2
		y0=range/2
		self.context.lineWidth = 3;
		
		offset = range/2
		console.log(range,middle,tick)
		
		self.x=new Array;
		self.y=new Array;
		for( var x =0; x < 5; x++){
			y=  (x * x)/ (4 * 5)
			console.log(y)
			self.x[x]=middle+x*tick
			self.y[x]=middle+y*tick
		}
		console.log(self.x)
		
		self.context.beginPath();
		self.context.moveTo(self.x[0],self.y[0]);
		for (var i = 1; i < self.x.length; i++) {
			console.log(self.x[i])
			self.context.lineTo(self.x[i],self.y[i]);
		}
		self.context.stroke();
		
		/*
		 * 
		
		self.context.strokeStyle = '#008000';
		for( var i =0; i < 4; i++){
			
			startX=x0+(i*tick)
			startY=startX
			endX=x0+((1+i)*tick)
			endY=endX
			
			self.context.beginPath();
			self.context.moveTo(startX,startY);
			self.context.lineTo(endX,endY);
			self.context.stroke();
			

		}
		
		 */
		
		
		
		
		
		/*
		 * self.context.beginPath();
		self.context.moveTo(self.canvas.width/2, self.canvas.height/2);
		self.context.lineTo(1000,900);
		self.context.lineWidth = 2;
		self.context.strokeStyle = '#ff0000';
		self.context.stroke();
		
		
		self.context.beginPath();
		self.context.moveTo(self.canvas.width/2, self.canvas.height/2);
		var a=-1;
		var b=-500;
		var c=0
		
		
		console.log(range)
		console.log(tick)
		for (var t=0; t < 50; t++){
			
			x=range/2 + tick * t;
			//range - 
			y=range/2 + 0.001*Math.pow(x,2);
			//y=(0.002*Math.pow(x,2));
			//y = (a * Math.pow(x,2)) + (b * x) + c;
			//y = -1*Math.pow((x+10),2);
			console.log(x,y)
			self.context.lineTo(x, y);
		}
		self.context.lineWidth = 2;
		self.context.strokeStyle = '#ff0000';
		self.context.stroke();
		    
		
		
		for (var i = 0; i < self.x.length; i++) {
		//	console.log(i, self.x[i])
			self.context.lineTo(self.x[i],self.y[i]);
		}
		self.context.stroke();
		
		 */
	}
	
	
}
