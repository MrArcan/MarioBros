//Draw
let backgroundGame;
let backgroundMenu;
let imageWall;
let imageMario, imageLuigi;
let imageFMario, imageFLuigi;
let imageTMario, imageTLuigi;
let wallX = [600, 900, 1200, 1500];
let wallY = [400, 600, 500, 300];
let myFont;

//Sound
let coin;

//Logic

let x = 0;
let posY = 50;
let dY = 3;
let estado = 0;
let record = 0;
let recordAnterior = 0;
let score = 0;
let fall = 0;
let buttonM, buttonL;

function preload() {
  backgroundGame = loadImage("./img/Backgrounds/overworld.jpg");
  backgroundMenu = loadImage("./img/Backgrounds/castle.jpg");
  imageWall = loadImage("./img/pared.png");
  imageCharacter = loadImage("./img/characters/mario.png");
  imageFalling = loadImage("./img/characters/marioFalling.png");
  imageTransition = loadImage("./img/characters/marioTFalling.png");
  myFont = loadFont("./fond/SuperMario.ttf");
  coin = loadSound("./sounds/coin.wav");
}

function setup() {
  // put setup code here
  createCanvas(1200, 800);
  textFont(myFont);
  textSize(34);
  frameRate(60);
}

function draw() {
  // put drawing code here
  if (estado === 1) {
    imageMode(CORNER);
    image(backgroundGame, x, 0, backgroundGame.width, 800);
    image(
      backgroundGame,
      x + backgroundGame.width,
      0,
      backgroundGame.width,
      800
    );
    x = x - 6;
    //Movimiento del personaje
    dY = dY + 1; //dy += 1
    posY = posY + dY;
    //obstaculos
    for (let i = 0; i < wallX.length; i++) {
      //Obstáculos
      imageMode(CENTER);
      image(imageWall, wallX[i], wallY[i] - 500);
      image(imageWall, wallX[i], wallY[i] + 500);

      //Generar nuevas coordenadas para las paredes
      if (wallX[i] < 0) {
        wallX[i] = width;
        wallY[i] = random(200, 600);
      }
      //Agregar score
      if (wallX[i] === 300) {
        score = score + 1;
        coin.play();
        record = max(score, record);
      }
      //Colisiones
      if (
        posY < 0 ||
        posY > height ||
        (abs(wallX[i] - 300) < 50 && abs(posY - wallY[i]) > 100)
      ) {
        estado = 0;
        // musicaJuego.stop()
        cursor();
      }

      wallX[i] += -6; //Desplazamiento de las paredes
    }

    if (x < -backgroundGame.width) {
      x = 0;
    }
    //Desplegamos al personaje
    // //Animation
    if (fall < -5) {
      image(imageCharacter, 300, posY, 50, 50);
      fall++;
    } else if (fall < 0) {
      image(imageTransition, 300, posY, 50, 50);
      fall++;
    } else {
      image(imageFalling, 300, posY, 50, 50);
    }
    //Desplegamos el score
    text("score: " + score, width / 2 - 50, 50);
    // coin.play();
  } else {
    imageMode(CORNER);
    image(backgroundMenu, 0, 0, backgroundMenu.width, 800);
    text("Record: " + record, 100, 450);
  }
}

function keyPressed() {
  if (keyCode == 32 || keyCode == UP_ARROW) {
    if (estado === 0) {
      estado = 1;
      recordAnterior = record;
      score = 0;
      x = 0;
      posY = 50;
      dY = 3;
      wallX = [600, 900, 1200, 1500];
      wallY = [400, 600, 500, 300];
      noCursor();
      // if (musicaRecord.isPlaying()) {
      //   musicaRecord.stop() UWU
      // }
      //musicaJuego.play()
    } else {
      fall = -15;
      dY = -15;
    }
  }
}
