var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running, monkey_collide;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime, score;
var ground;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collide = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 300);
  
  monkey = createSprite(50,260,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collide);
  monkey.scale = 0.08;
  
  ground = createSprite(200,280,800,10);
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
  monkey.setCollider("circle",0,0,280);
  
  survivalTime = 0;
  score = 0;
}

function draw() {
  background("lightblue");
 
  fill("black");
  text("Survival Time: "+ survivalTime, 250,50);
  text("Points: "+ score,50,50);
  
  if(gameState === PLAY){
    
    ground.velocityX = -12;
    
    survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 250) {
        monkey.velocityY = -12;
    }
    
    if(foodGroup.isTouching(monkey)){
      score = score + 1;
      foodGroup.destroyEach();
    }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    monkey.collide(ground);
  
    spawnFood();
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
    
  }
   else if (gameState === END) {
     
     ground.velocityX = 0;
     monkey.velocityY = 0
     
     monkey.changeAnimation("collided",monkey_collide);
     
     textSize(20);
     fill("black");
     text("Game Over!",140,150);  
     
     obstacleGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);    
   }
  
  drawSprites();
}

function spawnFood(){
  if (frameCount % 300 === 0){
    var obstacle = createSprite(600,265,10,40);
    obstacle.velocityX = -(6 + survivalTime/100);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.08;
    obstacle.lifetime = 100;
    
    obstacleGroup.add(obstacle);
  }
}

function spawnObstacles(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,180,40,10);
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -(6 + survivalTime/100);
    banana.lifetime = 100;
    
    foodGroup.add(banana);
  }
}



