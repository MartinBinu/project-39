  var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

  var gameState = "start";
  var particle;
  var particle2;

  var playButton;

  var divisions = [];
  var particles = [];
  var plinkos = [];

  var divisionHeight = 300;
  var stage = 0;
  var score = 0;
  var turn = 0;

  function setup() {

    createCanvas(800, 800);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(width/2,height,width,20);

    playButton = createButton('Play');

    for(var k = 0; k <=width; k = k + 80) {
      divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
    }


    for(var j = 75; j <=width; j=j+50){
      plinkos.push(new Plinko(j,75));
    }

    for(var j = 50; j <=width-10; j=j+50){
      plinkos.push(new Plinko(j,175));
    }

    for(var j = 75; j <=width; j=j+50) {
      plinkos.push(new Plinko(j,275));
    }

    for(var j = 50; j <=width-10; j=j+50){
      plinkos.push(new Plinko(j,375));
    }

    playButton.position(width/2 + 18,height/2 + 13);
  }
  
  function draw() {
    background("black");
    textSize(20);
    Engine.update(engine);

    for (var i = 0; i < plinkos.length; i++) {  
      plinkos[i].display();
    }

    for (var k = 0; k < divisions.length; k++) {
      divisions[k].display();
    }


  if(stage === 0){
    for (var j = 0; j < particles.length; j++) {
      particles[j].display();
    }

    if(gameState === "start"){
      if(frameCount%10===0){
        particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
      }
      
      playButton.mousePressed(()=>{
        gameState = "play";
        stage = 1;
      })
    }

  }

  if(gameState === "start"){
    fill(random(0, 255), random(0, 255), random(0, 255));
    textSize(100);
    text("Plinko",width/2 - 110,height/2)

    fill(random(0, 255), random(0, 255), random(0, 255));
    textSize(20);
    text(" press ",width/2 - 50,height/2 + 20)
  }

  if(gameState === "play"){
    fill(random(0, 255), random(0, 255), random(0, 255));
    textSize(20);
    text("Score: "+ score,width - 100,20)

    playButton.hide();

    particle.display();

    mousePressed();
  }
}

function mousePressed(){
   if(gameState === "play"){
    particle = new Particle2(mouseX,40,10);
   }
}
