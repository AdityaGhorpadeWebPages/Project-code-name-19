var spaceImg, space;
var SpaceXImg, SpaceX;
var alienImg, alien, alienGroup;
var peopleImg, people, peopleGroup;
var gameState = "play"

var score = 0

function preload(){
  spaceImg = loadImage("Space.jpg");
  SpaceXImg = loadImage("SpaceX.png");
  alienImg = loadImage("Alien.png");
  peopleImg = loadImage("People.png");
}

function setup() {

  createCanvas(1200, 600);
  space = createSprite(700,100);
  space.addImage("space",spaceImg);
  // space.velocityY = 1;
  space.scale = 1

  SpaceX = createSprite(200,200,50,50)
  SpaceX.addImage("spacex",SpaceXImg)
  SpaceX.scale = 0.09

  
  alienGroup = createGroup()
  peopleGroup = createGroup()

  score = 0

  
}

function draw() {
  background(spaceImg);
  textSize(20);
  fill("yellow")
  text("Humans Saved: "+ score,30,50);
  
  if(gameState === "play"){

  
  if(keyDown("SPACE")){
    SpaceX.velocityY = -10
  }
  SpaceX.velocityY = SpaceX.velocityY + 0.8

  if(keyDown("LEFT_ARROW")){
    SpaceX.x = SpaceX.x - 3
  }

  if(keyDown("RIGHT_ARROW")){
    SpaceX.x = SpaceX.x + 3
  }

  if(space.y > 400){
    space.y = 300
  }

  if(alienGroup.isTouching(SpaceX) || SpaceX.y > 600){
    SpaceX.destroy()
    gameState = "end"
  }

  if(peopleGroup.isTouching(SpaceX)){
    score = score+1  
    peopleGroup.destroyEach()
  }

  Aliens()
  Human()
  drawSprites()
  }
    if(gameState === "end"){
      stroke("red") 
      fill("red")
      textSize(30)
      text("Game Over :(", 530,250)
    }
}

function Aliens(){
  if(frameCount % 200 === 0){
  var alien = createSprite(200,-50)
  alien.addImage(alienImg)
  alien.scale = 0.4
  alien.x = Math.round(random(400,800))
  
  alien.velocityY = 1

  alien.lifetime = 800
  alienGroup.add(alien)
  }
}

function Human(){
  if(frameCount % 200 === 0){
  var people = createSprite(200,-50)
  people.addImage(peopleImg)
  people.scale = 0.1
  people.x = Math.round(random(200,400))
  
  people.velocityY = 1

  people.lifetime = 800
  peopleGroup.add(people)
  }
}

function reset(){
  gameState = PLAY;
  SpaceX.destroy()

  // score = 0
  
}