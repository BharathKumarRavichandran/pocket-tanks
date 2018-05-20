var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var canvasWidth = canvas.getAttribute("width");
var canvasHeight = canvas.getAttribute("height");
var w1 = (screenWidth/2) - screenWidth*0.1;;
var w2 = screenWidth*0.07;
document.getElementById("title").style.marginLeft = w1+"px";
canvas.style.marginLeft = w2+"px"; 

var baseY = 490;
var playerActive = 1;
var moves1 = 4;
var moves2 = 4; 
var weapon1 = "Single Shot";
var weapon2 = "Single Shot";
var angle1 = 60;
var angle2 = 60;
var power1 = 1;
var power2 = 1;
	

var bg1 = new Image();
var bg2 = new Image();
var fireButton = new Image();
var moveButton = new Image();
var weaponButton = new Image();
var angleButton = new Image();
var powerButton = new Image();

bg1.src = "assets/background_1.png";
bg2.src = "assets/castle_bricks.png";
fireButton.src = "assets/fire_button.png";
moveButton.src = "assets/move_button.png";
weaponButton.src = "assets/weapong.png";
angleButton.src = "assets/angle_button.png";
powerButton.src = "assets/powerslider.png";

var gamePlayAudio = new Audio("audio/BurtBacharach.wav");


function stopAudio(audio){
    audio.pause();
    audio.currentTime = 0;
}

document.addEventListener('keydown', function(event){
        	if(event.keyCode==70){//f fire button

        	}
            if(event.keyCode==87){//w weapon up

            }
            if(event.keyCode==83){//s weapon down

            }
            if(event.keyCode==65){//a tank move left
            		if(playerActive==1){
						if(moves1>0){
							moves1--;
						}
					}
					else{
						if(moves2>0){
							moves2--;
						}
			        }
			}
            if(event.keyCode==68){//d tank move right	
				if(playerActive==1){
					if(moves1>0){
						moves1--;
					}
				}
				else{
					if(moves2>0){
						moves2--;
					}
				}
            }
            if(event.keyCode==74){//j angle decrease
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
            if(event.keyCode==76){//l angle increase
            	if(playerActive==1){
					if(angle1<90){
						angle1++;
					}
				}
				else{
					if(angle2<90){
						angle2++;
					}
				}
            }
        	if(event.keyCode==78){//n power increase
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
            if(event.keyCode==77){//m power increase
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
    },false);


function drawAssets(){ //Function to draw Backgrounds, Buttons, Letters.
	ctx.drawImage(bg1,0,0,canvasWidth,canvasHeight);
	ctx.drawImage(bg2,0,490,canvasWidth,200);
	ctx.drawImage(moveButton,50,520,150,65);
	ctx.drawImage(weaponButton,250,515,190,70);
	ctx.drawImage(fireButton,540,520,170,60);
	ctx.drawImage(angleButton,800,520,180,60);
	ctx.drawImage(powerButton,1050,520,170,60);
	ctx.fillStyle = "orange";
	ctx.font = "bold 25px Arial";
	ctx.fillText("A",65,564);
	ctx.fillText("D",173,564);
	ctx.fillText("F",620,600);
	ctx.fillText("J",817,576);
	ctx.fillText("L",953,576);
	ctx.font = "bold 15px Arial";
	ctx.fillText("W",420,555);
	ctx.fillText("S",422,578);
	ctx.fillText("N",1124,573);
	ctx.fillText("M",1203,573);
}

function drawValues(){
	ctx.fillStyle = "#FF0000";
	ctx.font = "bold 22px Arial";

	if(playerActive==1){
		ctx.fillText(moves1,120,576);
		ctx.font = "bold 17px Arial";
		ctx.fillText(weapon1,283,568);
		ctx.font = "bold 22px Arial";
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
		ctx.font = "bold 17px Arial";
		ctx.fillText(weapon2,283,568);
		ctx.font = "bold 22px Arial";
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

function drawHill(){
	ctx.beginPath();
	ctx.fillStyle = "darkgreen";
	ctx.moveTo(30,baseY);
	ctx.bezierCurveTo(100,400,200,500,300,350);
	ctx.bezierCurveTo(400,250,500,300,550,150);
	ctx.bezierCurveTo(650,100,680,100,700,100);
	ctx.bezierCurveTo(750,250,800,150,850,200);
	ctx.bezierCurveTo(900,200,950,250,1000,350);
	ctx.bezierCurveTo(1050,350,1100,400,1120,430);
	ctx.bezierCurveTo(1150,400, 1200,500,canvasWidth-30,baseY);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#FFFFFF";
}

function animation(){

	drawAssets();
	drawValues();
	drawHill();
	ctx.fillStyle = "#FFFFFF";

	requestAnimationFrame(animation);
}

animation();
