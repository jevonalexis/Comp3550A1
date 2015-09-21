	//Defining global variables
	
	//game canvas and context
	var canvas= document.getElementById("gameCanvas"); 
	var context = canvas.getContext("2d") ;
	
	//All variable decalrations for game functions
	var interval=0, timeInterval=0, maxTime=61, time=0;
	var totalDrops=0, wasteCount=0, totalCollected=0;
	var maxWidth = 800, maxHeight = 600;
	var result, i;
	var audio = new Audio ('music.mp3');
	
	//bucket object and attributes
	var bucket={
			x:10,
			y:10,
			speed: 300 // movement in pixels per second
	};
	
	//Array for droplet objects and attributes
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

	//This function is used to select which pipe drips at random where a pipe with an active droplet can not drip
	function findPipe(){
		var pipeId;
		pipeId= Math.floor(Math.random() * 3) + 1;
		if(droplet[pipeId].active === true){
			return null;
		}
		return pipeId;
	}
	
	//This function uses the fid pipe to find the relevant pipe to drip
	//Then generates the speed of the droplet and sets its status to active allowing it to be drawn
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
	
	//This function uses intersection of bucket and droplet coordinates to determine if the droplet was collected by the bucket
	//Droplets collected add to the user's score, both droplets off the scope of the canvas or collected has an innactive status which ceases its drawing 
	function collected(id){
		if(droplet[id].active=== true){
			if(
			   droplet[id].x >= (bucket.x -4)&& 
			   droplet[id].x <=((bucket.x+64) -16)&&
			   (droplet[id].y+13)<=maxHeight-58 &&
			   (droplet[id].y+13)>=maxHeight-60)
			   {			
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

	//enables the use of arrow keys to play the game
	var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);

	//This is the major code involved in drawing the content on the screen
	//This draws the background, bucket,taps, droplets, timer and score 
	function images() {
		if(time < maxTime){
			if (bgReady) { //draw the background
				context.drawImage(bgImage, 0, 0);
			}
			if (tapReady) {//draw the taps
				context.drawImage(tapImage, 40, 80);
				context.drawImage(tapImage, (maxWidth/3)*1 + 40 , 80);
				context.drawImage(tapImage, (maxWidth/3)*2 + 40, 80);
			}
			if (bucketReady) {//draw the bucket
				context.drawImage(bucketImage, bucket.x, maxHeight-60);
			}
			for (i=1;i<=3;i++){//draw the active droplets
				if(droplet[i].active === true){
					context.drawImage(dropletImage, droplet[i].x, droplet[i].y);
				}
			}
			//draws the timer and score			
			context.fillStyle = "rgb(128, 0, 0)";
			context.font = "30px Helvetica";
			context.textAlign = "left";
			context.textBaseline = "top";
			context.fillText("Time: " +time, 35, 5);
			context.fillText("Water Drops Saved: " +totalCollected, 0, 45);
		}
		//draw the result based on water drops collected and pauses the music
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

	//This function updates the positions of the water drops and bucket
	//It also runs the collected function to allow the water drops to be collected  or disposed of	
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
	
	//calculates the time
	function checktime(){
		time = time+1;
		if(time%0.5===0){
			drip();
		}
		return time;
	}
	
	//Call back function timeControl() and variable "then" used to update time and update movement of droplets an bucket
	var then=Date.now();
	var timeControl = function () {
		now = Date.now();
		delta = now - then;
	
		update(delta / 1000);
		if (time <= 0){
			checktime(delta/1000);
		}
		images();
		then = now;
	};
	
	//Starts the game by using the call back function to generate time and by extension draw images and run the game
	function startgame(){
		document.getElementById("gameLore").style.display = "none"; //Hides the lore making the game the only element on the page
		 ("game starts");
		interval = setInterval(timeControl, 1000/60);
		timeInterval = setInterval(checktime, 1000);
		time=0;
		audio.play();
	}
	
	//Determines output message of the user's performance based on water collected and water wasted and returns it to be displayed
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
		else {
			res=c;
		}
		return res;
	}