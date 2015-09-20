	//Defining global variables
	var canvas= document.getElementById("gameCanvas");
	var context = canvas.getContext("2d") ;

	var interval=0, timeInterval=0, maxTime=61, time=0;
	var totalDrops=0, wasteCount=0, totalCollected=0;
	var maxWidth = 800, maxHeight = 600;
	var result, i;
	var audio = new Audio ('music.mp3');
	
	var bucket={
			x:10,
			y:10,
			speed: 300 // movement in pixels per second
	};

	var droplet = [];
	for (i = 0; i <= 3;i++) {
		droplet.push({
			id: i,
			x:0,
			y:0,
			speed:0,
			active:false
		});
	}
	droplet[1].x=125;
	droplet[2].x=(maxWidth/3)*1 + 125;
	droplet[3].x=(maxWidth/3)*2 +125;

	
	function findPipe(){
		var pipeId;
		pipeId= Math.floor(Math.random() * 3) + 1;
		if(droplet[pipeId].active === true){
			return null;
		}
		return pipeId;
	}

	function drip(){
		var spd, id;
		id=findPipe();
		if(id !== null ){
			spd=Math.floor(Math.random() * 10) + 100;
			droplet[id].speed=spd;
			droplet[id].active=true;
			droplet[id].y=155;
		}
	}

	function collected(id){
		if(droplet[id].active=== true){
			if(droplet[id].x >= (bucket.x -4) && droplet[id].x <=((bucket.x+64) -16)&& (droplet[id].y+13)<=maxHeight-58 && (droplet[id].y+13)>=maxHeight-60){
				droplet[id].active=false;
				totalCollected+=1;
			}
			else if(droplet[id].y >= maxHeight){
				droplet[id].active=false;
				wasteCount+=1;
			}
		}
	}
	
	
//defining images

	//background image
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};
	bgImage.src = "game_images/background.jpg";

	//bucket image
	var bucketReady = false;
	var bucketImage = new Image();
	bucketImage.onload = function () {
		bucketReady = true;
	};
	bucketImage.src = "game_images/bucket.gif";
	
	//tap image
	var tapReady = false;
	var tapImage = new Image();
	tapImage.onload = function () {
		tapReady = true;
	};
	tapImage.src = "game_images/tap.png";

	//Droplet image
	var dropletImage = new Image();
	var dropletReady=false;
	dropletImage.onload = function () {
		dropletReady = true;
	};
	dropletImage.src = "game_images/droplet.gif";

	
	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);

	
	function images() {
		if(time < maxTime){
			if (bgReady) {
				context.drawImage(bgImage, 0, 0);
			}
			if (tapReady) {
				context.drawImage(tapImage, 40, 80);
				context.drawImage(tapImage, (maxWidth/3)*1 + 40 , 80);
				context.drawImage(tapImage, (maxWidth/3)*2 + 40, 80);
			}
			if (bucketReady) {
				context.drawImage(bucketImage, bucket.x, maxHeight-60);
			}
			for (i=1;i<=3;i++){
				if(droplet[i].active === true){
					context.drawImage(dropletImage, droplet[i].x, droplet[i].y);
				}
			}			
			context.fillStyle = "rgb(128, 0, 0)";
			//context.fillStyle = "rgb(250, 250, 250)";
			context.font = "30px Helvetica";
			context.textAlign = "left";
			context.textBaseline = "top";
			context.fillText("Time: " +time, 35, 5);
			context.fillText("Water Drops Saved: " +totalCollected, 0, 45);
		}
		else if(time > maxTime){
			result = endGame();
			context.fillStyle = "rgb(0, 102, 255)";
			context.textAlign = "left";
			context.textBaseline = "top";
			context.font ="32px Georgia";
			context.fillText(result, 10,350);
			clearInterval(interval);				
			audio.pause();
		}
	}

	//new function main() and variable "then"
	var then = Date.now();

	var main = function () {
		var now = Date.now();
		var delta = now - then;

		update(delta / 1000);
		if (time <= 0){
			checktime(delta/1000);
		}
		images();
		then = now;
	};

	function update(modifier){
		
		if (bucket.x>0 && 37 in keysDown) { // Player holding left
			bucket.x -= bucket.speed *modifier;
		}
		if (bucket.x + 64 <maxWidth && 39 in keysDown) { // Player holding right
			bucket.x += bucket.speed *modifier ;
		}
		
		for (i = 1; i <= 3;i++) {
			if(droplet[i].active===true && droplet[i].y < maxHeight+1){
				droplet[i].y+=droplet[i].speed *modifier ;
			}
		}
		collected(1);collected(2);collected(3);
	}

	function checktime(){
		time = time+1;
		if(time%0.5===0){
			drip();
		}
		return time;
	}
	function startgame(){
		console.log ("game starts");
		interval = setInterval(main, 1000/60);
		timeInterval = setInterval(checktime, 1000);
		time=0;
		audio.play();
	}

	function endGame(){
		var a,b,c,res;
		a="You're a true Hero. Keep up the good work";
		b="You've made the first step towards saving the world";
		c="You have a long way to go.Saving the world begins now";
		
		totalDrops=totalCollected+wasteCount;
		if((totalDrops*0.7) <= totalCollected){
			res=a;
		}
		else if((totalDrops*0.5) <= totalCollected){
			res=b;
		}
		else res=c;
				console.log(totalCollected);
				console.log(wasteCount);
		return res;
	}