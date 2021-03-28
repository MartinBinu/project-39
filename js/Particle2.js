class Particle2 {
   constructor(x,y,radius) {

      var options ={
          "restitution":0.4,
          "friction":0.5,
          "density":1.0
      }
      
      this.body = Bodies.circle(x,y,radius,options);     
      this.radius = radius; 
      this.color = color(random(0, 255), random(0, 255), random(0, 255));
      World.add(world, this.body);

   }

   display(){
      var pos = this.body.position;
      var angle = this.body.angle;

      push();
      translate(pos.x, pos.y);
      rotate(angle);
      //imageMode(CENTER);
      noStroke();
      fill(this.color)
      ellipseMode(RADIUS);
      ellipse(0, 0, this.radius,this.radius);
      pop();
   }
   
};