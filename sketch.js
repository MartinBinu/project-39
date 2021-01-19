var bg, bgImage,gameOver,finished;
var ig;
var monkey, monkeyRunning,monkeyCrash;
var BananaGroup,bannanaImage;
var ObstacleGroup,RockGroup,obstacleImage2;
var score = 0;
var bananaCount = 0;
var button;
var chance;

function preload(){

  bgImage = loadImage("pic/jungle2.jpg");

  gameOver = loadImage("pic/game Over.jpg")

  monkeyRunning = loadAnimation("pic/Monkey_01.png","pic/Monkey_02.png","pic/Monkey_03.png","pic/Monkey_04.png","pic/Monkey_05.png","pic/Monkey_06.png","pic/Monkey_07.png","pic/Monkey_08.png","pic/Monkey_09.png","pic/Monkey_10.png");

  monkeyCrash = loadAnimation("pic/Monkey_01.png");  

  bananaImage = loadImage("pic/Banana.png");

  obstacleImage = loadImage("pic/stone.png");

}

function setup(){ 

   createCanvas(displayWidth,displayHeight - 100);

   chance = 2;

   bg = createSprite(displayWidth/2,displayHeight/2)
   bg.addImage("bg",bgImage);
   bg.width = displayWidth + 100;
   bg.scale = 1.59;

   button = createButton("Retry")
   button.position(displayWidth/2,displayHeight/2 + 20);

   monkey = createSprite(80,400);
   monkey.addAnimation("monkeyRunning",monkeyRunning);
   monkey.scale = 0.1;

   ig = createSprite(200,650,400,30);
   ig.visible = false;

   BananaGroup = new Group();

   ObstacleGroup = new Group();

   RockGroup = new Group();

}

function draw() {

   fill("white");

   background("green");

   edges = createEdgeSprites(); 

   monkey.collide(ig);
   monkey.collide(edges[2]);

   camera.position.x = displayWidth/2;
   camera.position.y = displayHeight/2 - 50;

   if(chance > 0){

      bg.velocityX = -(3 + 50*score/100);

      monkey.scale = 0.1 + bananaCount/100;
      monkey.velocityY = monkey.velocityY + 0.6;
   
      button.hide();

      if(keyDown("space")){
         monkey.velocityY = -5;
      }
   
      if(bg.x < 612){
        bg.x = displayWidth - 700;
      }
   
      for(var i = 0;i<BananaGroup.length;i++){
         if(monkey.isTouching(BananaGroup.get(i))){
            BananaGroup.get(i).destroy();
            score = score + 1;
            bananaCount = bananaCount + 1;
         }
      }

      for(var i = 0;i<ObstacleGroup.length;i++){
         if(monkey.isTouching(ObstacleGroup.get(i))){
            ObstacleGroup.get(i).destroy();
            bananaCount = 0;
            monkey.y = 400;
            chance = chance - 1;        
         }
      }
   

      console.log(BananaGroup.length);

      spawnObstacles();

   }

if(chance === 0){

   bg.velocityX = 0;
   button.show();

   button.mousePressed(function(){
      chance = 2;
   })

}

   drawSprites();

   textSize(15);
   text("Banana Count: " + bananaCount,10,50)
   text("chances: " + chance,10,70);

   if(chance === 0){
   textSize(20);
   text("Game Over",displayWidth/2 - 10,displayHeight/2);
   }

   spawnBananas();

}

function spawnBananas() {
  
    

   if(frameCount % 120 === 0){ 
    var banana = createSprite(displayWidth,300);
    banana.addImage("banana_1",bananaImage);
    banana.scale = 0.03;
    banana.velocityX = -(3 + 50*score/100)
    banana.y = Math.round(random(100,displayHeight - 200));
    banana.lifetime = -1;
    BananaGroup.add(banana); 
 
   }

  }
    
  function spawnObstacles() {
    
   if(frameCount % 100 === 0){ 
     var obstacles = createSprite(displayWidth,350); 
     obstacles.addImage("stone",obstacleImage);
     obstacles.scale = 0.1;
     obstacles.velocityX = -(3 + 50*score/100);
     obstacles.y = Math.round(random(100,displayHeight - 200));
     obstacles.lifetime = -1;
     ObstacleGroup.add(obstacles);

   }

  }