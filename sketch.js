var knife,knifeSound,knifeimage,fruit1,fruit2,fruit3,fruit4,fruit;
var PLAY=1
var END=0
var Gamestate=PLAY
var fruitgroup,enemyGroup,monster,monsterImage
var score=0,gameOver,gameOverSound,gameOverImage

function preload(){
    knifeimage=loadImage("sword.png")
    knifeSound=loadSound("knifeSwooshSound.mp3")
    fruit1=loadImage("fruit1.png")
    fruit2=loadImage("fruit2.png")
    fruit3=loadImage("fruit3.png")
    fruit4=loadImage("fruit4.png")
    monsterImage=loadImage("alien1.png")
    gameOverImage=loadImage("gameover.png")
    gameOverSound=loadSound("gameover.mp3")
}
function setup(){
    createCanvas(400,400) 
    knife=createSprite(200,200,1,1) 
    Gamestate=PLAY;

    gameOver=createSprite(200,200,1,1);
  
    fruitgroup=new Group()
    enemygroup=new Group()
}

function draw(){
  if(Gamestate===PLAY){
      background("#0bf0c0")
      gameOver.x=-300;
      gameOver.y=200;
      knife.x=World.mouseX
      knife.y=World.mouseY
      knife.addImage("knife",knifeimage)  
      knife.scale=0.6;
    
      fruit();
      enemy();
    
      if(fruitgroup.isTouching(knife)){
        fruitgroup.destroyEach()
        score=score+2
        knifeSound.play();
      }
      if(enemygroup.isTouching(knife)){
        gameOverSound.play();
        Gamestate=END  
      }
      stroke("black")
      fill("red");
      textSize(20);
      text("SCORE:"+score,160,40)
  }
  
  if(Gamestate===END){
        background("orange")
        gameOver.x=200;
        gameOver.y=200;
        gameOver.addImage(gameOverImage);
        gameOver.scale=0.95;
        knife.x=-200
        knife.y=-200
        fruitgroup.setVelocityXEach(0)
        enemygroup.setVelocityXEach(0)
        fruitgroup.destroyEach()
        enemygroup.destroyEach()
        if(keyDown("enter")){
          Gamestate=PLAY;
          score=0;
        }
  }
  
  drawSprites()
}
function fruit(){
  if(frameCount%80===0){
    var fruit=createSprite(400,200,20,20)
    var selectPos=Math.round(random(1,2))
    switch(selectPos){
        case 1:fruit.x=500
               fruit.velocityX=-5;
               break;
        case 2:fruit.x=-100
               fruit.velocityX=5; 
        break;
    }
    fruit.y=random(0,400);
    fruit.scale=0.2
    var selectFruit=Math.round(random(1,4))
    switch(selectFruit){
      case 1 :fruit.addImage(fruit1)
        break;
        case 2 :fruit.addImage(fruit2)
        break;
        case 3 :fruit.addImage(fruit3)
        break;
        case 4 :fruit.addImage(fruit4)
        break;
        default:break;
    }
    
    fruitgroup.add(fruit);
  }
}
function enemy(){
  if(World.frameCount%45===0){
    monster=createSprite(600,200,20,20)
    monster.addImage("moving",monsterImage)
    var selectpos=Math.round(random(1,2))
    switch(selectpos){
      case 1:monster.x=-100
             monster.velocityX=7.5;
      break;
      case 2:monster.x=500
             monster.velocityX=-7.5;
    }
    monster.y=Math.round(random(0,400))
    monster.lifetime=150
    
    enemygroup.add(monster)
  }
}

