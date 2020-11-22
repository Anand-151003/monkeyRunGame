
var monkey , monkey_running , monkeyStopped , monkey2;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;


var ground;

var score;

function preload(){
  
  monkeyStopped = loadImage("sprite_0.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

  createCanvas(600,600);
  
  var survivalTime=0;
 
  
  //creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX= -4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
   monkey.setCollider("rectangle",0,0,160,monkey.height);
  monkey.debug = true

 
  
  score = 0;

  
}


function draw() {

  
  background(000);
  
  


  
      //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 300) {
       monkey.velocityY = -12;
        
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.5;
  
  //to stop monkey from falling down
  monkey.collide(ground);
  
      if (ground.x < 300){
      ground.x = ground.width/2;
        
    }
  
  
 
  
    if(monkey.isTouching(obstacleGroup)){
    monkey.velocityX = 0;
    monkey.velocityY = 0;
      ground.velocityX = 0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
     foodGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
    
  }

 spawnBananas();
  spawnObstacles();  
  
score=Math.ceil(frameCount/frameRate()) ;
  text("Survival Time "+ score, 300,100); 
  
  drawSprites();

  
}

function spawnBananas() {
  //write code here to spawn the bananas
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(180,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth =monkey.depth;
   monkey.depth = monkey.depth + 1;


//add each banana to the group
    foodGroup.add(banana);

  
}
}

function spawnObstacles() {
  //write code here to spawn the obstacles
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,120,40,10);
    obstacle.y = 330;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.08;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
   
//add each banana to the group
    obstacleGroup.add(obstacle);

  
}
}




