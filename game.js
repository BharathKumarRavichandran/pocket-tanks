var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var canvasWidth = canvas.getAttribute("width");
var canvasHeight = canvas.getAttribute("height");
var w1 = (screenWidth/2) - screenWidth*0.1;;
var w2 = screenWidth*0.07;
document.getElementById("title").style.marginLeft = w1+"px";//Aligning title in the centre by manipulating margin-left property
canvas.style.marginLeft = w2+"px";//Aligning canvas in the centre by manipulating margin-left property

var tankWidth = 80;
var tankHeight = 50;
var turretWidth = 60;
var turretHeight = 6;
var missileWidth = 20;
var missileHeight = 8;

var playerActive = 1;//player who is currently active in gameplay
var moves1 = 4;//moves left for player1
var moves2 = 4;//moves left for player2
var weapon1 = "Single Shot";//Weapon selected by player1
var weapon2 = "Single Shot";//Weapon selected by player2
var angle1 = 25;//Angle of turret of tank1
var angle2 = 25;//Angle of turret of tank2
var power1 = 1;//Power of missile launched by tank1
var power2 = 1;//Power of missile launched by tank2
var player1 = "Player 1";//Player1's name
var player2 = "Player 2";//Player2's name
var score1 = 0;//score of player1
var score2 = 0;//score of player2
var enter = false;//titlecard checker
var pause = false;//To check whether the gameplay is in pause or not
var quit = false;//To check whether the player wants to quit
var gameOver = false;//To check whether the game is over
var fire1 = false;//To check the missile motion of tank1
var fire2 = false;//To check the missile motion of tank2
var move = true;//To check/remove move event when missile is in motion
var angle = true;//To check/remove angle changing event when missile is in motion
var power = true;//To check/remove power changing event when missile is in motion
var weapon = true;//To check/remove weapon changing event when missile is in motion
var missile1Angle = angle1;//Angle of missile launched by tank1
var missile2Angle = angle2;//Angle of missile launched by tank2
var bullets1 = 5;//missiles left for tank1
var bullets2 = 5;//missiles left for tank2

var baseY = 490;
var tank1X = 70;
var tank1Y = 437;
var tank2X = 1130;
var tank2Y = 436;
var missile1X = turretWidth-20;
var	missile1Y = turretHeight-7;
var	missile2X=turretWidth-20;
var	missile2Y=turretHeight-7;
var shotWidth = 15;
var shotHeight = 15;
var shot1X = missile1X;
var shot1Y = missile1Y;
var shot2X = missile2X;
var shot2Y = missile2Y;
var mHitX1;//X-Coordinate of missile1's end tip 
var mHitY1;//Y-Coordinate of missile1's end tip
var mHitX2;//X-Coordinate of missile2's end tip
var mHitY2;//Y-Coordinate of missile2's end tip
var yhit;
var yhit1;
var blastRadius = 12;//Radius of destruction of hill
var hillDamageArray = new Array();//Array to store objects of hill damage data

//variables used in making projectile motion
var bounce1=1;
var bounce2=1;
var gravity = 7;
var time = 0;
var inc = 0.5;
var velocity = 13+2*power1;
var Angle = (missile1Angle*(Math.PI)/180);
var velocityx = velocity*Math.cos(Angle);
var velocityy = velocity*Math.sin(Angle)*-1;
var pw1;
var pw2;

//Image variables
var bg1 = new Image();
var bg2 = new Image();
var fireButton = new Image();
var moveButton = new Image();
var weaponButton = new Image();
var angleButton = new Image();
var powerButton = new Image();
var tank1 = new Image();
var tank2 = new Image();
var turret = new Image();
var missile = new Image();
var missileInvert = new Image();
var shot = new Image();
var blastImg = new Image();
var missileVert = new Image();
var explosionImage = new Image();

//Image variables assignment
bg1.src = "assets/background_1.png";
bg2.src = "assets/castle_bricks.png";
fireButton.src = "assets/fire_button.png";
moveButton.src = "assets/move_button.png";
weaponButton.src = "assets/weapong.png";
angleButton.src = "assets/angle_button.png";
powerButton.src = "assets/powerslider.png";
tank1.src = "assets/tank11.png";
tank2.src = "assets/tank113.png";
turret.src = "assets/tanks_turret3.png";
missile.src = "assets/bazooka.png";
missileInvert.src = "assets/bazookaInvert.png";
shot.src = "assets/projectiles/shot.png";
blastImg.src = "assets/bazooka_0_574.png";
missileVert.src = "assets/bazookaVert.png";
explosionImage.src = "assets/explosion_PNG15395.png";

//Audio variables and assignment
var gamePlayAudio = new Audio("audio/BurtBacharach.wav");
var shotFired = new Audio("audio/cannon.wav");
var dead = new Audio("audio/dead.wav");
var expshort = new Audio("audio/expshort.wav");
var expmedium = new Audio("audio/expmedium.wav");
var exphuge = new Audio("audio/exphuge.wav");
var weaponChange = new Audio("audio/load.mp3");


function stopAudio(audio){//Function to stop Audio from playing by passing audio variable_name
    audio.pause();
    audio.currentTime = 0;
}

function clearCircle(x,y,radius,theta1,theta2) {
	ctx.fillStyle = "grey";
	ctx.save();
	ctx.beginPath();
	ctx.arc(x,y,radius,theta1, theta2, true);
	ctx.clip();
	ctx.fillRect(x-radius,y-radius,radius*2,radius*2);
	ctx.restore();
	ctx.fillStyle = "white";
}

document.addEventListener('keydown', function(event){//EventListener function to listen to events in the document
			if(event.keyCode==13){//enter keyCode
				enter=true;
			}

        	if(event.keyCode==70&&enter==true){//f fire button
        		if(playerActive==1){
	        		if(bullets1>0&&fire1==false){
	        			var velocity;
	        			if(power1==1){
	        				velocity = 13;
	        				pw1=1.3;
	        			}
	        			else if(power1==2){
	        				velocity = 15;
	        				pw1=1.6;
	        			}
	        			else if(power1==3){
	        				velocity = 20;
	        				pw1=1.8;
	        			}
	        			time = 0;
						velocity = 13+2*power1;
						shot1X=tank1X+37+turretWidth*Math.cos(angle1*Math.PI/180);
						shot1Y=tank1Y-turretWidth*Math.sin(angle1*Math.PI/180);
						missile1X=tank1X+37+turretWidth*Math.cos(angle1*Math.PI/180);
						missile1Y=tank1Y-turretWidth*Math.sin(angle1*Math.PI/180);
						Angle = (angle1*(Math.PI)/180);
						velocityx = velocity*Math.cos(Angle);
						velocityy = velocity*Math.sin(Angle)*-1;
	        			shotFired.play();	
	        			fire1=true;
	        			bullets1--;
	        			move=false;
	        			angle=false;
	        			power=false;
	        			weapon=false;
	        		}	
        		}
        		else{
        			if(bullets2>0&&fire2==false){
	        			var velocity;
	        			if(power2==1){
	        				velocity = 13;
	        				pw2=1.3;
	        			}
	        			else if(power2==2){
	        				velocity = 15;
	        				pw2=1.5;
	        			}
	        			else if(power2==3){
	        				velocity = 90;
	        				pw2=1.8;
	        			}
	        			time = 0;
						velocity = 13+2*power2;
						Angle = (angle2*(Math.PI)/180);
						velocityx = velocity*Math.cos(Angle);
						velocityy = velocity*Math.sin(Angle)*-1;  
						shot2X=tank2X-0.5*turretWidth*Math.cos(Angle);
						shot2Y=tank2Y-turretWidth*Math.sin(Angle);
						missile2X=tank2X-0.5*turretWidth*Math.cos(Angle);
						missile2Y=tank2Y-turretWidth*Math.sin(Angle);      				
        				shotFired.play();
        				fire2=true;
        				bullets2--;
        				move=false;
	        			angle=false;
	        			power=false;
	        			weapon=false;
        			}
        		}

        	}
            if((event.keyCode==87||event.keyCode==83)&&weapon==true){//w weapon up, s weapon down
          		weaponChange.play();
            	if(playerActive==1){
            		if(weapon1=="Single Shot"){
            			weapon1="Missile";
            		}
            		else{
            			weapon1="Single Shot";
            		}
            	}
            	else{
            		if(weapon2=="Single Shot"){
            			weapon2="Missile";
            		}
            		else{
            			weapon2="Single Shot";
            		}

            	}

            }
            if(event.keyCode==65&&move==true){//a tank move left
            		if(playerActive==1){
						if(moves1>0){
							moves1--;
							tank1X-=20;
						}
					}
					else{
						if(moves2>0){
							moves2--;
							tank2X-=20;
						}
			        }
			}
            if(event.keyCode==68&&move==true){//d tank move right	
				if(playerActive==1){
					if(moves1>0){
						moves1--;
						tank1X+=20;
					}
				}
				else{
					if(moves2>0){
						moves2--;
						tank2X+=20;
					}
				}
            }
            if(event.keyCode==74&&angle==true){//j angle decrease
            	if(playerActive==1){
            		if(angle1>0){
						angle1--;
            		}
				}
				else{
					if(angle2>0){
						angle2--;
					}
				}
            }
            if(event.keyCode==76&&angle==true){//l angle increase
            	if(playerActive==1){
					if(angle1<50){
						angle1++;
					}
				}
				else{
					if(angle2<50){
						angle2++;
					}
				}
            }
        	if(event.keyCode==78&&power==true){//n power increase
            	if(playerActive==1){
					if(power1>1){
						power1--;
					}
				}
				else{
					if(power2>1){
						power2--;
					}
				}
        	}
            if(event.keyCode==77&&power==true){//m power increase
            	if(playerActive==1){
					if(power1<3){
						power1++;
					}
				}
				else{
					if(power2<3){
						power2++;
					}
				}
        	}

        	if(event.keyCode==80){//p pause/resume
        		if(pause==false){
        			pause=true;
        		}
        		else{
        			pause=false;	
        			animation();
        		}
        		if(quit==true&&pause==true){
        				initialise();
						quit=false;
						pauseGameDraw();
        			}
        	}
        	if(event.keyCode==82){//r restart
        		window.location.reload();
        	}
        	if(event.keyCode==81){//q quit
        		quit=true;
        	}
        	if(event.keyCode==85&&enter==true){//u key to switch players
        		if(playerActive==1){
        			playerActive=2;
        		}
        		else{
        			playerActive=1;
        		}
        	}
    },false);

function drawTitleCard(){
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvasWidth,canvasHeight);
	ctx.fillStyle = "orange";
	ctx.font = "bold italic 50px Trebuchet MS";
	ctx.fillText("Pocket Tanks",500,120);
	ctx.fillStyle = "white";
	ctx.font = "20px Trebuchet MS";
	ctx.fillText("Each player will have 5 bullets and 4 moves and you can change",390,200);
	ctx.fillText("the angle of turret and the power of missile any number of times.",385,250);
	ctx.fillStyle = "yellow";
	ctx.fillText("Single Shot Points: 15",290,300);
	ctx.fillText("Missile Points: 20",880,300);
	ctx.fillStyle = "darkred";
	ctx.font = "bold 30px Trebuchet MS";
	ctx.fillText("Press F to fire",550,330);
	ctx.fillStyle = "lightblue";
	ctx.fillText("Press U to switch players",490,390);
	ctx.fillStyle = "white";
	ctx.fillText("Press ENTER to start the game!",450,450);
}


function drawAssets(){ //Function to draw Backgrounds, Buttons, Letters.
	ctx.drawImage(bg1,0,0,canvasWidth,canvasHeight);
	ctx.drawImage(bg2,0,490,canvasWidth,200);
	ctx.drawImage(moveButton,50,520,150,65);
	ctx.drawImage(weaponButton,250,515,190,70);
	ctx.drawImage(fireButton,540,520,170,60);
	ctx.drawImage(angleButton,800,520,180,60);
	ctx.drawImage(powerButton,1050,520,170,60);
	ctx.fillStyle = "orange";
	ctx.font = "bold 25px Trebuchet MS";
	ctx.fillText("A",65,564);
	ctx.fillText("D",173,564);
	ctx.fillText("F",620,600);
	ctx.fillText("J",817,576);
	ctx.fillText("L",953,576);
	ctx.font = "bold 15px Trebuchet MS";
	ctx.fillText("W",420,555);
	ctx.fillText("S",422,578);
	ctx.fillText("N",1124,573);
	ctx.fillText("M",1203,573);
}

function drawValues(){//Function which draws move,angle,power values
	ctx.fillStyle = "#FF0000";
	ctx.font = "bold 22px Trebuchet MS";

	if(playerActive==1){
		ctx.fillText(moves1,120,576);
		ctx.font = "bold 17px Trebuchet MS";
		ctx.fillText(weapon1,297,568);
		ctx.font = "bold 22px Trebuchet MS";
		ctx.fillText(angle1,879,575);
		ctx.fillText(power1,1160,575);
		if(power1==1){
			ctx.fillRect(1061.5,530,10,15);
		}
		if(power1==2){
			ctx.fillRect(1061.5,530,75,15);
		}
		if(power1==3){
			ctx.fillRect(1061.5,530,150,15);	
		}

	}

	else{
		ctx.fillText(moves2,120,576);
		ctx.font = "bold 17px Trebuchet MS";
		ctx.fillText(weapon2,297,568);
		ctx.font = "bold 22px Trebuchet MS";
		ctx.fillText(angle2,879,575);
		ctx.fillText(power2,1160,575);
		if(power2==1){
			ctx.fillRect(1061.5,530,10,15);
		}
		if(power2==2){
			ctx.fillRect(1061.5,530,75,15);
		}
		if(power2==3){
			ctx.fillRect(1061.5,530,150,15);	
		}
	}
}

function drawHill(){//Function which draws the hill in between the tanks
	ctx.beginPath();
	ctx.strokeStyle = "green";
	ctx.fillStyle = "darkgreen";
	ctx.moveTo(30,baseY);
	ctx.bezierCurveTo(100,470,160,520,400,450);
	ctx.lineTo(650,320);
	ctx.lineTo(950,480);
	ctx.bezierCurveTo(1150,490, 1200,480,canvasWidth-30,baseY);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	ctx.fillStyle = "#FFFFFF";
}

function drawTank1(){//Function which draws the tank which is placed on the left side
	ctx.drawImage(tank1,tank1X,tank1Y,tankWidth,tankHeight);
}

function drawTank2(){//Function which draws the tank which is placed on the right side
	ctx.drawImage(tank2,tank2X,tank2Y,tankWidth,tankHeight);
}

function drawTurret1(){//Function which draws the tank's turret which is placed on the left side
	ctx.save();
	ctx.translate(tank1X+37,tank1Y+6);
	ctx.rotate(-1*angle1*Math.PI/180);
	ctx.drawImage(turret,0,0,turretWidth,turretHeight);
	ctx.restore();
	missile1Angle=angle1;
}

function drawTurret2(){//Function which draws the tank's turret which is placed on the right side
	ctx.save();
	ctx.translate(tank2X+40,tank2Y+13);
	ctx.rotate(Math.PI+angle2*Math.PI/180);
	ctx.drawImage(turret,0,0,turretWidth,turretHeight);
	ctx.restore();
	missile2Angle=angle2;
}

function missile1Draw(){//Function which draws the missile launched from tank1
	ctx.drawImage(missile,missile1X,missile1Y,missileWidth,missileHeight);
	time = time + inc;
	missile1X = missile1X + velocityx*inc*pw1*1.1;
	missile1Y = missile1Y + velocityy*inc*bounce1;
	if(missile1X<650*Math.cos(angle1*Math.PI/180)){
		if(angle1<=15){
			velocityy = velocityy + gravity*inc*0.2;
			bounce1=1;
		}
		else if (angle1>15&&angle1<=25){
			velocityy = velocityy + gravity*inc*0.11;
			bounce1=1.4;
		}
		else if (angle1>25&&angle1<=35){
			velocityy = velocityy + gravity*inc*0.03;
			bounce1=1.4;
		}
		else if (angle1>35&&angle1<=42){
			velocityy = velocityy + gravity*inc*0.01;
			bounce1=1.4;
		}
		else{
			velocityy = velocityy - gravity*inc*0.00001;
			bounce1=1.4;
		}
	}
	else{
		velocityy = velocityy + gravity*inc*0.1;
	}  
    velocityx = velocityx;
    velocityy = velocityy + gravity*inc*0.01;
	mHitX1 = missile1X;
	mHitY1 = missile1Y;	
	missileHitCheck1();
}

function shot1Draw(){//Function which draws the shot launched from tank1
	ctx.drawImage(shot,shot1X,shot1Y,shotWidth,shotHeight);
    time = time + inc;
	shot1X = shot1X + velocityx*inc*pw1*1.4;
	shot1Y = shot1Y + velocityy*inc*bounce1;
	if(shot1X<650*Math.cos(angle1*Math.PI/180)){
		if(angle1<=15){
			velocityy = velocityy + gravity*inc*0.2;
			bounce1=1;
		}
		else if (angle1>15&&angle1<=25){
			velocityy = velocityy + gravity*inc*0.11;
			bounce1=1.4;
		}
		else if (angle1>25&&angle1<=35){
			velocityy = velocityy + gravity*inc*0.03;
			bounce1=1.4;
		}
		else if (angle1>35&&angle1<=42){
			velocityy = velocityy + gravity*inc*0.01;
			bounce1=1.4;
		}
		else{
			velocityy = velocityy - gravity*inc*0.00001;
			bounce1=1.4;
		}
	}
	else{
		velocityy = velocityy + gravity*inc*0.1;
	} 
    velocityx = velocityx;
    velocityy = velocityy + gravity*inc*0.01;
	mHitX1 = shot1X;
	mHitY1 = shot1Y;	
	missileHitCheck1();
}

function missile2Draw(){//Function which draws the missile launched from tank2
	ctx.drawImage(missileInvert,missile2X,missile2Y-5,missileWidth,missileHeight);
	time = time + inc;
	missile2X = missile2X - velocityx*inc*pw2;
	missile2Y = missile2Y + velocityy*inc;
	if(missile2X>650*Math.cos(Angle)){
		velocityy = velocityy + gravity*inc*0.01;
		if(angle2<=15){
			velocityy = velocityy + gravity*inc*0.2;
			bounce2=1;
		}

		else if (angle2>15&&angle2<=25){
			velocityy = velocityy + gravity*inc*0.11;
			bounce2=1.4;
		}
		else if (angle2>25&&angle2<=35){
			velocityy = velocityy + gravity*inc*0.03;
			bounce2=1.8;
		}
		else if (angle2>35&&angle2<=42){
			velocityy = velocityy + gravity*inc*0.015;
			bounce2=2.1;
		}
		else{
			bounce2=2.2;
		}
	}
	else{
		velocityy = velocityy + gravity*inc*0.1;
	}  
    velocityx = velocityx;
    velocityy = velocityy + gravity*inc*0.01;
    mHitX2=missile2X;
    mHitY2=missile2Y;
    missileHitCheck2();
}

function shot2Draw(){//Function which draws the shot launched from tank2
	ctx.drawImage(shot,shot2X,shot2Y-5,shotWidth,shotHeight);
	time = time + inc;
	shot2X = shot2X - velocityx*inc*pw2;
	shot2Y = shot2Y + velocityy*inc*bounce2;
	if(shot2X>650*Math.cos(Angle)){
		velocityy = velocityy + gravity*inc*0.04;
		if(angle2<=15){
			velocityy = velocityy + gravity*inc*0.2;
			bounce2=1;
		}
		else if (angle2>15&&angle2<=25){
			velocityy = velocityy + gravity*inc*0.11;
			bounce2=1.2;
		}
		else if (angle2>25&&angle2<=35){
			velocityy = velocityy + gravity*inc*0.03;
			bounce2=1.25;
		}
		else if (angle2>35&&angle2<=42){
			velocityy = velocityy + gravity*inc*0.015;
			bounce2=1.25;
		}
		else{
			bounce2=1.3;
		}
	}
	else{
		velocityy = velocityy + gravity*inc*0.1;
	}
    
    velocityx = velocityx;
    velocityy = velocityy + gravity*inc*0.01;
    mHitX2=shot2X;
    mHitY2=shot2Y;
	missileHitCheck2();
}

function hillDamage(x,y,side){
	this.x=x;
	this.y=y;
	this.side=side;
}

function missileHitCheck1(){//Function to check whether the missile1 hits the tank2
	if(((mHitX1+10>=tank2X)&&(mHitX1<=tank2X+tankWidth))&&((mHitY1>=tank2Y-8)&&(mHitY1<=tank2Y+tankHeight))){//condition if the missile hits the tank
		if(weapon1=="Single Shot"){
			score1+=15;
			shot1X=tank1X+37+turretWidth*Math.cos(angle1*Math.PI/180);
			shot1Y=tank1Y-turretWidth*Math.sin(angle1*Math.PI/180);
		}
		else{
			score1+=20;
			missile1X=tank1X+37+turretWidth*Math.cos(angle1*Math.PI/180);
			missile1Y=tank1Y-turretWidth*Math.sin(angle1*Math.PI/180);
		}
		if(power1==1){
			expshort.play();
		}
		else if(power1==2){
			expmedium.play();
		}
		else{
			exphuge.play();
		}
		//Removing restriction on user to change the values
		fire1=false;
		move=true;
	    angle=true;
	    power=true;
	    weapon=true;
		playerActive=2;

		if(bullets1==0&&bullets2==0){//gameOver checking condition
			gameOver=true;
		}
	}

	if(mHitX1>canvasWidth||mHitY1<0||mHitX1<0||mHitY1>canvasHeight){//condition if the missile goes out of the canvas
		//Removing restriction on user to change the values
		fire1=false;
	    move=true;
	    angle=true;
	    power=true;
	    weapon=true;	
		playerActive=2;
		if(weapon1=="Single Shot"){
			shot1X=tank1X+37+turretWidth*Math.cos(angle1*Math.PI/180);
			shot1Y=tank1Y-turretWidth*Math.sin(angle1*Math.PI/180);
		}
		else{
			missile1X=tank1X+37+turretWidth*Math.cos(angle1*Math.PI/180);
			missile1Y=tank1Y-turretWidth*Math.sin(angle1*Math.PI/180);
		}

		if(bullets1==0&&bullets2==0){//gameOver checking condition
			gameOver=true;
		}
	}	


	yhit = (16450-13*mHitX1)/25;
	yhit1 = (-33*mHitX1+124350)/247;
	if(((mHitX1>=400&&mHitX1<=650)&&((yhit-mHitY1)<20))||((mHitX1>=153&&mHitX1<=400)&&((yhit1-mHitY1)<20))){//condition if the missile hits the left hill 
		hillDamageArray.push(new hillDamage(mHitX1+10,mHitY1,"left"));	

		if(weapon1=="Single Shot"){
			shot1X=tank1X+37+turretWidth*Math.cos(angle1*Math.PI/180);
			shot1Y=tank1Y-turretWidth*Math.sin(angle1*Math.PI/180);
		}
		else{
			missile1X=tank1X+37+turretWidth*Math.cos(angle1*Math.PI/180);
			missile1Y=tank1Y-turretWidth*Math.sin(angle1*Math.PI/180);
		}
		if(power1==1){
			expshort.play();
		}
		else if(power1==2){
			expmedium.play();
		}
		else{
			exphuge.play();
		}
		//Removing restriction on user to change the values
		fire1=false;
		move=true;
	    angle=true;
	    power=true;
	    weapon=true;
		playerActive=2;

		if(bullets1==0&&bullets2==0){//gameOver checking condition
			gameOver=true;
		}
	}

	yhit = (-700+8*mHitX1)/15;
	yhit1 = (3*mHitX1-81150)/175;
	if(((mHitX1>=650&&mHitX1<=950)&&((yhit-mHitY1)<20))||((mHitX1>=950&&mHitX1<=1115)&&((yhit1+mHitY1)>5))){//condition if the missile hits the right hill 
		hillDamageArray.push(new hillDamage(mHitX1-10,mHitY1+12,"right"));
		if(weapon1=="Single Shot"){
			shot1X=tank1X+37+turretWidth*Math.cos(angle1*Math.PI/180);
			shot1Y=tank1Y-turretWidth*Math.sin(angle1*Math.PI/180);
		}
		else{
			missile1X=tank1X+37+turretWidth*Math.cos(angle1*Math.PI/180);
			missile1Y=tank1Y-turretWidth*Math.sin(angle1*Math.PI/180);
		}
		if(power1==1){
			expshort.play();
		}
		else if(power1==2){
			expmedium.play();
		}
		else{
			exphuge.play();
		}
		//Removing restriction on user to change the values
		fire1=false;
		move=true;
	    angle=true;
	    power=true;
	    weapon=true;
		playerActive=2;

		if(bullets1==0&&bullets2==0){//gameOver checking condition
			gameOver=true;
		}
	}
}

function missileHitCheck2(){//Function to check whether the missile2 hits the tank1
	if(((mHitX2>=tank1X)&&(mHitX2<=tank1X+tankWidth+10))&&((mHitY2>=tank1Y-8)&&(mHitY2<=tank1Y+tankHeight))){//condition if the missile hits the tank
		if(weapon2=="Single Shot"){
			score2+=15;
			shot2X=tank2X-0.5*turretWidth*Math.cos(Angle);
			shot2Y=tank2Y-turretWidth*Math.sin(Angle);   
		}
		else{
			score2+=20;
			missile2X=tank2X-0.5*turretWidth*Math.cos(Angle);
			missile2Y=tank2Y-turretWidth*Math.sin(Angle);   
		}
		if(power2==1){
			expshort.play();
		}
		else if(power2==2){
			expmedium.play();
		}
		else{
			exphuge.play();
		}
		//Removing restriction on user to change the values
		fire2=false;
		move=true;
	    angle=true;
	    power=true;
	    weapon=true;
		playerActive=1;

		if(bullets1==0&&bullets2==0){//gameOver checking condition
			gameOver=true;
		}
	}

	if(mHitX2<0||mHitY2<0||mHitX2>canvasWidth||mHitY2>canvasHeight){//condition if the missile goes out of the canvas
		//Removing restriction on user to change the values
		fire2=false;
		move=true;
	    angle=true;
	    power=true;
	    weapon=true;
		playerActive=1;
		if(weapon2=="Single Shot"){
			shot2X=tank2X-0.5*turretWidth*Math.cos(Angle);
			shot2Y=tank2Y-turretWidth*Math.sin(Angle);   
		}
		else{
			missile2X=tank2X-0.5*turretWidth*Math.cos(Angle);
			missile2Y=tank2Y-turretWidth*Math.sin(Angle);   
		}
		if(bullets1==0&&bullets2==0){//gameOver checking condition
			gameOver=true;
		}
	}

	yhit = (16450-13*mHitX2)/25;
	yhit1 = (-33*mHitX2+124350)/247;
	if(((mHitX2>=400&&mHitX2<=650)&&((yhit-mHitY2)<5))||((mHitX2>=153&&mHitX2<=400)&&((yhit1-mHitY2)<2))){//condition if the missile hits the left hill 
		hillDamageArray.push(new hillDamage(mHitX2+20,mHitY2-13,"left"));
		if(weapon2=="Single Shot"){
			shot2X=tank2X-0.5*turretWidth*Math.cos(Angle);
			shot2Y=tank2Y-turretWidth*Math.sin(Angle);   
		}
		else{
			shot2X=tank2X-0.5*turretWidth*Math.cos(Angle);
			shot2Y=tank2Y-turretWidth*Math.sin(Angle);   
		}
		if(power2==1){
			expshort.play();
		}
		else if(power2==2){
			expmedium.play();
		}
		else{
			exphuge.play();
		}
		//Removing restriction on user to change the values
		fire2=false;
		move=true;
	    angle=true;
	    power=true;
	    weapon=true;
		playerActive=1;

		if(bullets1==0&&bullets2==0){//gameOver checking condition
			gameOver=true;
		}
	}

	yhit = (-700+8*mHitX2)/15;
	yhit1 = (3*mHitX2-81150)/175;
	if(((mHitX2>=650&&mHitX2<=950)&&((yhit-mHitY2)<5))||((mHitX2>=950&&mHitX2<=1115)&&((yhit1+mHitY2)>5))){//condition if the missile hits the right hill
		hillDamageArray.push(new hillDamage(mHitX2-44,mHitY2,"right"));
		if(weapon2=="Single Shot"){
			shot2X=tank2X-0.5*turretWidth*Math.cos(Angle);
			shot2Y=tank2Y-turretWidth*Math.sin(Angle);   
		}
		else{
			shot2X=tank2X-0.5*turretWidth*Math.cos(Angle);
			shot2Y=tank2Y-turretWidth*Math.sin(Angle);   
		}
		if(power2==1){
			expshort.play();
		}
		else if(power2==2){
			expmedium.play();
		}
		else{
			exphuge.play();
		}
		//Removing restriction on user to change the values
		fire2=false;
		move=true;
	    angle=true;
	    power=true;
	    weapon=true;
		playerActive=1;

		if(bullets1==0&&bullets2==0){//gameOver checking condition
			gameOver=true;
		}
	}
}

function playerDataDraw(){//Function which draws the players score,pause,quit button information
	ctx.font = "bold 32px Trebuchet MS";
	ctx.fillStyle = "#123524";
	ctx.fillText(player1,20,80);
	var bX1 = 160;
	var bY1 = 55; 
	for(i=0;i<bullets1;i++){
		ctx.drawImage(missileVert,bX1+30*i,bY1,15,30);
	}
	ctx.fillText(score1,20,120);
	ctx.fillText(player2,1100,80);
	var bX2 = 1100;
	var bY2 = 55; 
	for(i=bullets2;i>0;i--){
		ctx.drawImage(missileVert,bX2-30*i,bY2,15,30);
	}
	ctx.fillText(score2,1185,120);
	ctx.font = "bold 25px Trebuchet MS";
	ctx.fillStyle = "darkred";
	ctx.fillText("Player Active: "+playerActive,20,160);
	ctx.fillText("Pause: P",1125,160);
	ctx.fillText("Quit: Q",1138,193);
	ctx.fillText("Restart: R",1105,226);
}

function pauseGameDraw(){//Function which draws the card placed on game pause
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 0.6;
	ctx.fillRect(canvasWidth-canvasWidth*0.73,canvasHeight-canvasHeight*0.8,600,300);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#FF0000";
	ctx.font = "40px Trebuchet MS";
	ctx.fillText("GAME PAUSED",canvasWidth-canvasWidth*0.59,canvasHeight-canvasHeight*0.65);
	ctx.font = "30px Trebuchet MS";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Press P to resume",canvasWidth-canvasWidth*0.59,canvasHeight-canvasHeight*0.52);
	ctx.fillText("Press R to restart",canvasWidth-canvasWidth*0.59,canvasHeight-canvasHeight*0.40);
}

function quitGameDraw(){//Function which draws the card placed on game quit
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 0.6;
	ctx.fillRect(canvasWidth-canvasWidth*0.73,canvasHeight-canvasHeight*0.8,600,300);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#FF0000";
	ctx.font = "40px Trebuchet MS";
	ctx.fillText("Are you sure to Quit?",canvasWidth-canvasWidth*0.64,canvasHeight-canvasHeight*0.65);
	ctx.font = "30px Trebuchet MS";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText("Press P to resume",canvasWidth-canvasWidth*0.59,canvasHeight-canvasHeight*0.52);
	ctx.fillText("Press R to restart",canvasWidth-canvasWidth*0.59,canvasHeight-canvasHeight*0.40);
}

function gameOverDraw(){//end screen to draw on canvas when the game is over
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 0.6;
	ctx.fillRect(canvasWidth-canvasWidth*0.73,canvasHeight-canvasHeight*0.8,600,300);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "#FF0000";
	ctx.font = "40px Trebuchet MS";
	ctx.fillText("GAME OVER",canvasWidth-canvasWidth*0.59,canvasHeight-canvasHeight*0.65);
	ctx.font = "30px Trebuchet MS";
	ctx.fillStyle = "#FFFFFF";
	ctx.fillText(player1+" : "+score1,canvasWidth-canvasWidth*0.68,canvasHeight-canvasHeight*0.53);
	ctx.fillText(player2+" : "+score2,canvasWidth-canvasWidth*0.45,canvasHeight-canvasHeight*0.53);
	ctx.fillText("Press R to restart",canvasWidth-canvasWidth*0.60,canvasHeight-canvasHeight*0.40);
}

function initialise(){//Function to call other functions collectively
	drawAssets();
	drawValues();
	drawHill();
	drawTurret1();
	drawTurret2();
	drawTank1();
	drawTank2();
	playerDataDraw();
}

function animation(){

	if(enter==true){

		initialise();//initialising functions to draw required elements over the canvas

		for(i=0;i<hillDamageArray.length;i++){//to draw blast arc, explosionImage at explosion spots
			if(hillDamageArray[i].side=="left"){
				clearCircle(hillDamageArray[i].x,hillDamageArray[i].y,blastRadius,Math.PI-36.43*Math.PI/180,2*Math.PI-36.43*Math.PI/180);
			}
			else{
				clearCircle(hillDamageArray[i].x,hillDamageArray[i].y,blastRadius,-20-40.36*Math.PI/180,-2*Math.PI/180+Math.PI-139.64*Math.PI/180);		
			}
			ctx.drawImage(explosionImage,hillDamageArray[i].x-20,hillDamageArray[i].y-25,45,45);
		}

		if(fire1==true){
			if(weapon1=="Single Shot"){
				shot1Draw();
			}
			else{
				missile1Draw();
			}
		}
		if(fire2==true){
			if(weapon2=="Single Shot"){
				shot2Draw();
			}	
			else{
				missile2Draw();
			}
		}	

		if(pause==true){
			pauseGameDraw();
			return;
		}
		if(quit==true){
			pause=true;
			quitGameDraw();
			return;
		}

		if(gameOver==true){//Gameover condition checking
			dead.play();
			gameOverDraw();
			return;
		}
	}	

	requestAnimationFrame(animation);
}

drawTitleCard();
animation();