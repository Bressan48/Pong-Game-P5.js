//var. posições da bola
let xBall = 300;
let yBall = 200;
let diameter = 15;
let radio = diameter / 2;

//var. velocidade da bola
let ballspeedX = 7;
let ballspeedY = 7;

//var. posições do retângulo jogável
let xRect = 5;
let yRect = 150;
let wRect = 10;
let hRect = 90;

//var. posições do retângulo oponente
let xOponente = 585;
let yOponente = 150;
let wOponente = 10;
let hOponente = 90;
let oponentespeedY;
let failChance = 0;

//var. placar de pontos
let playerPoints = 0;
let oponentePoints = 0;

//var. sons do jogo
let raquetada;
let ponto;
let trilha;




//valor dos sons
function preload(){
  trilha = loadSound("Drive-Around.mp3");
  ponto = loadSound("Collect.mp3");
  raquetada = loadSound("Raquetada.mp3");
}




//jogo/desenhar jogo
function setup() {
  createCanvas(600, 400);
  trilha.loop();
}
function draw() {
  background(0);
  showBall();
  moveBall();
  collision();
  showRect();
  moveRect();
  showOponente();
  moveOponente();
  showPlacar();
  makePoints();
  calculateFailChance()
}




//mostrar bola
function showBall(){
    circle(xBall,yBall,diameter);
}

//movimento da bola
function moveBall(){
  xBall += ballspeedX;
  yBall += ballspeedY;
}




//funções das colisões
function collision(){
  
  //xBall + radio : lado direito da bola
  //xBall - radio : lado esquerdo da bola
  //yBall - radio : parte superior da bola
  //yBall + radio : parte inferior da bola
  //xRect         : lado esquerdo da raquete esquerda
  //xRect + wRect : lado direito da raquete esquerda
  //yRect         : parte superior da raquete esquerda
  //yRect + hRect : parte inferior da raquete esquerda
  //xOponente         : lado esquerdo da raquete oponente
  //xOponente + wOponente : lado direito da raquete oponente
  //yOponente         : parte superior da raquete oponente
  //yOponente + hOponente : parte inferior da raquete oponente

//Invertendo a direcao quando bate nas paredes
  if (((xBall + radio) > 600) || ((xBall - radio) < 0)){
    ballspeedX *= -1;
  }
  
//Invertendo a direcao quando bate no teto e no chão
  if (((yBall - radio) < 0) || ((yBall + radio) > 400)){
    ballspeedY *= -1;
  }  
  
//Tratando colisao com a raquete jogável
  if (((xBall - radio) < (xRect + wRect)) && ((yBall + radio) > yRect) && ((yBall - radio) < (yRect + hRect)) || (xBall < (xRect + wRect)) && (yBall > yRect) && (yBall < (yRect + hRect))){
    ballspeedX *= -1;
    raquetada.play();
//tratando erro da bola entrando na raquete jogável
  if (((yBall + radio) >= yRect) || ((yBall - radio) <= (yRect + hRect)) && (xBall <= 15)){
    xBall = 20
    raquetada.play();  
  }
}
  
//Tratando colisao com a raquete oponente
  if (((xBall + radio) > xOponente) && ((yBall + radio) > yOponente) && ((yBall - radio) < (yOponente + hOponente)) || (xBall > xOponente) && (yBall > yOponente) && (yBall < (yOponente + hOponente))){
    ballspeedX *= -1;
    raquetada.play();
//tratando erro da bola entrando na raquete oponente
  if (((yBall + radio) >= yOponente) || ((yBall - radio) <= (Oponente + hOponente)) && (xBall >= 585)){
    xBall = 580
    raquetada.play();
    }
  }
}




//mostrar raquete jogável
function showRect(){
  rect (xRect,yRect,wRect,hRect)
}

//movimento da raquete jogável
function moveRect(){
  if (keyIsDown(87)){
    yRect -= 6;
  }
  if (keyIsDown(83)){
    yRect += 6;
  }
}




//função desenhar raquete oponene
function showOponente(){
  rect (xOponente,yOponente,wOponente,hOponente)
}

//movimento da raquete oponente
function moveOponente(){
  //oponentespeedY = (yBall - yOponente - 35);
  //yOponente += (oponentespeedY + failChance)
  if (keyIsDown(UP_ARROW)){
    yOponente -= 6;
  }
  if (keyIsDown(DOWN_ARROW)){
    yOponente += 6;
  }
}

function calculateFailChance(){
  if (oponentePoints >= playerPoints){
    failChance += 1
  if (failChance >= 39){
    failChance = 40
   }
  } else {
    failChance -= 1
    if (failChance <= 35){
      failChance = 35
    }
  }
}




//mostrar os números no placar
function showPlacar(){
  textAlign(CENTER)
  textSize(16);
  fill(color(255,140,0))
  rect(130,10,40,20);
  fill(color(255,140,0))
  rect(440,10,40,20);
  fill(255);
  text(playerPoints,150,26);
  text(oponentePoints, 460, 26)
}

//fazer pontos
function makePoints(){
  if ((xBall - radio) < 5){
    playerPoints += 1
    ponto.play();
  }
  if ((xBall + radio) > 595){
    oponentePoints += 1
    ponto.play();
  }
}
