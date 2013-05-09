function Sun(canvasId){
	var self=this;
	self.canvas=document.getElementById(canvasId);
	self.context=self.canvas.getContext("2d");
	self.radius=20
	self.degree=270
	self.amplitude=200
	self.lineWidth=2
	self.color="#FFFF00"
	self.canvasWidth=self.canvas.width
	self.canvasHeight=self.canvas.height
	self.centerX = self.amplitude * Math.sin(self.degree*Math.PI/180) + self.canvasWidth/2;
	self.centerY = -1*self.amplitude * Math.cos(self.degree*Math.PI/180) + self.canvasHeight/2;
	self.init=function(){
		
	}
	self.draw=function(){
		self.context.beginPath();
		self.context.arc(self.centerX, self.centerY, self.radius, 0, 2*Math.PI,false);
		self.context.fillStyle=self.color;
		self.context.lineWidth=self.lineWidth;
		self.context.strokeStyle="black"; 
		self.context.fill();
		self.context.stroke();
	}
	
}
