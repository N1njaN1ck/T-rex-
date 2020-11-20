var ground, groundImage;
var trex;
var trex_running;
var invisibleGround;
var cloudImage;
var count = 0;
var obstacleImage1,obstacleImage2, obstacleImage3, obstacleImage4, obstacleImage5, obstacleImage6;
var cloudsGroup, obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImage;
var gameOver, gameOverImage;
function preload(){
  groundImage=loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacleImage1 = loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle2.png");
  obstacleImage3 = loadImage("obstacle3.png");
  obstacleImage4 = loadImage("obstacle4.png");
  obstacleImage5 = loadImage("obstacle5.png");
  obstacleImage6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  restartImage = loadImage("restart.png");
  trex_collided = loadAnimation("trex_collided.png");
}
function reset(){
  count = 0;
  gameState = PLAY
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  //trex.setAnimation("trex");
  trex.changeAnimation("trex_running", trex_running);
}



function setup() {
   createCanvas(600,200);
   trex=createSprite(100,185,20,50);
   trex.addAnimation("trex_running", trex_running);
   trex.scale = 0.5;
   
   cloudsGroup = new Group();
   obstaclesGroup = new Group();
   
   gameOver = createSprite(300,50,100,20);
   gameOver.addImage(gameOverImage);
   
   restart = createSprite(300,100,50,10);
   restart.addImage(restartImage); 
  
   trex.addAnimation("trex_collided", trex_collided);
  
   ground = createSprite(300,185,600,20); 
   ground.x = ground.width /2;
   ground.addImage(groundImage);
   
   invisibleGround = createSprite(300,198,600,10)
   invisibleGround.visible = false; 
   

}
function draw() {
  background(180);
  text("Anik's Trex Game", 300, 20);
    if(gameState === PLAY){
      if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12 ;
      //playSound("jump.mp3");    
}
      gameOver.visible = false;
      restart.visible = false;
      trex.velocityY = trex.velocityY + 0.8;
      count = count+ Math.round(World.frameRate/60);
       spawnObstacles();
       spawnClouds();
    if(obstaclesGroup.isTouching(trex)){
       gameState = END;
       //playSound("die.mp3")
       //trex.velocityY = -12 ;
       //playSound("jump.mp3");
        
      
    }
    }
    else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    //set velocity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("trex_collided", trex_collided);
    //trex.setAnimation("trex_collided");
    if(mousePressedOver(restart)){
    //console.log("restart")
     reset();
      
    }
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    }
   
      
   
    trex.collide(invisibleGround);
  
 
  
  text("Score: "+ count, 500, 50);
  
 
drawSprites();
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(550,20,40,10);
    
    var rand = Math.round(random(10,80));
    //console.log(rand);
    cloud.y = rand;
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,177,10,40);
    obstacle.velocityX = -6;
    //obstacle.addImage(obstacleImage1);
    //generate random obstacles
     var rand = Math.round(random(1,6));
    //obstacle.setAnimation("obstacle" + rand);
    
    switch(rand){
      case 1:obstacle.addImage(obstacleImage1);
        break;
        case 2:obstacle.addImage(obstacleImage2);
        break;
        case 3:obstacle.addImage(obstacleImage3);
        break;
        case 4:obstacle.addImage(obstacleImage4);
        break;
        case 5:obstacle.addImage(obstacleImage5);
        break;
        case 6:obstacle.addImage(obstacleImage6);
        break;
        default:
        break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}



