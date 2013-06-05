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
	
	
	self.findParabola=function(linearLength){
		
		var lastX=0
		var lastY=0
		var x=0
		var y=0
		var found=0;
		var HALFLinearLength=linearLength/2
		var currentHALFLinearLength=0
		var lastHALFLinearLength=0
		var distance=0;
		var increment=linearLength/1000;
		var increment=parseFloat(increment.toFixed(2));
		//linearLength/10
		var parabola=new Object
		parabola.arcLength=linearLength;
		for (var focalPointY=1; focalPointY <= linearLength/3; focalPointY+=1){
			currentHALFLinearLength=0;
			found=0;
			var lastX=0, lastY=0;
			var counter=1;
			parabola.focalPointX=0
			parabola.focalPointY=focalPointY
			parabola.x=new Array;
			parabola.y=new Array;
			for(var x=1; x <= HALFLinearLength; x=parseFloat(x+increment)){
				x=parseFloat(x.toFixed(2))
				y=(x*x) / (4*focalPointY)
				y=parseFloat(y.toFixed(2))
				parabola.x.push(x)
				parabola.y.push(y)
				distance=Math.sqrt(((x-lastX)*(x-lastX)) + ((y-lastY)*(y-lastY)))
				distance=parseFloat(distance)
				
				lastHALFLinearLength=currentHALFLinearLength
				currentHALFLinearLength=parseFloat(currentHALFLinearLength)+parseFloat(distance)
				
				if (currentHALFLinearLength >= HALFLinearLength){
					found=1;
					break;
				} else if (y >= focalPointY){
					break;
					found=0;
				}
				
				lastX=x;
				lastY=y;
				counter++
			}
			if (found){break};
		}
		return parabola;
	}
	
	
	
	self.setPoints=function(){
		var parabola=self.findParabola(10);
		self.x=new Array;
		self.y=new Array;
		var range=self.canvas.width
		var middle=range/2
		var tick=(self.canvas.width/10)
		console.log(middle)
		for( var i =parabola.x.length-1; i > 0 ; i--){
			self.x[self.x.length]=middle-(tick*parabola.x[i])
			self.y[self.y.length]=range-(middle+(tick*parabola.y[i]));
			
		}
		for( var i =0; i < parabola.x.length; i++){
			self.x[self.x.length]=middle+(tick*parabola.x[i])
			self.y[self.y.length]=range-(middle+(tick*parabola.y[i]));
		}
		
		
	}
	self.rotatePoints=function(cx,cy,angle){
		
		for( var i =0; i < self.x.length;i++){
			
			
			s = Math.sin(angle);
			c = Math.cos(angle);
			
			  // translate point back to origin:
			self.x[i] -= cx;
			self.y[i] -= cy;
			
			  // rotate point
			xnew = self.x[i] * c - self.y[i]* s;
			ynew = self.x[i] * s + self.y[i] * c;
			
			self.x[i] = xnew + cx;
			self.y[i] = ynew + cy;
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
		
		self.context.beginPath();
		self.context.lineWidth = 5;
		self.context.moveTo(self.x[0],self.y[0]);
		for( var i =1; i < self.x.length; i++){
			self.context.lineTo(self.x[i],self.y[i]);
		}
		self.context.stroke();
		
	}
	
	
}
