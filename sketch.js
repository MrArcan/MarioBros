//Draw
let backgroundGame;
let backgroundMenu;
let imageWall;
//Animation
let imageMario, imageLuigi;
let imageFMario, imageFLuigi;
let imageTMario, imageTLuigi;
let imageCharacter, imageFalling, imageTransition;
//Menu
let selectMario, selectLuigi;
let happyMario, happyLuigi;
let widthNMario = 40,
  widthNLuigi = 40;
let heightNMario = 85,
  heightNLuigi = 85;
let im_c = 2;
let char = false;

let wallX = [600, 900, 1200, 1500];
let wallY = [400, 600, 500, 300];
let myFont;

//Sound
let coin, marioSound, luigiSound, soundTrack, menuSoundTrack;

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
  imageWall = loadImage("./img/Pipes/pared.png");
  imageMario = loadImage("./img/characters/mario.png");
  imageFMario = loadImage("./img/characters/marioFalling.png");
  imageTMario = loadImage("./img/characters/marioTFalling.png");
  imageLuigi = loadImage("./img/characters/luigi.png");
  imageFLuigi = loadImage("./img/characters/luigiFalling.png");
  imageTLuigi = loadImage("./img/characters/luigiTFalling.png");
  selectMario = loadImage("./img/characters/selectionCharacterMario.png");
  happyMario = loadImage("./img/characters/HappyMario.png");
  selectLuigi = loadImage("./img/characters/selectionCharacterLuigi.png");
  happyLuigi = loadImage("./img/characters/happyLuigi.png");
  myFont = loadFont("./fond/SuperMario.ttf");
  coin = loadSound("./sounds/coin.wav");
  marioSound = loadSound("./sounds/letsAGo.mp3");
  luigiSound = loadSound("./sounds/LuigiTime.mp3");
  soundTrack = loadSound("./sounds/mariosong.mp3");
  menuSoundTrack = loadSound("./sounds/menu.mp3");
}

function setup() {
  // put setup code here
  createCanvas(1200, 800);
  textFont(myFont);
  textSize(34);
  frameRate(60);
  menuSoundTrack.setVolume(0.5);
  soundTrack.setVolume(0.5);
  coin.setVolume(0.5);
}

function draw() {
  // put drawing code here
  if (estado === 1) {
    if (!soundTrack.isPlaying()) {
      soundTrack.play();
    }
    if (menuSoundTrack.isPlaying()) {
      menuSoundTrack.stop();
    }
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
  } else {
    //Estado == 0
    if (!menuSoundTrack.isPlaying()) {
      menuSoundTrack.play();
    }
    if (soundTrack.isPlaying()) {
      soundTrack.stop();
    }
    imageMode(CORNER);
    image(backgroundMenu, 0, 0, backgroundMenu.width, 800);
    text("Record: " + record, 100, 450);
    //This is the Character assignation
    if (im_c == 0) {
      imageCharacter = imageMario;
      imageFalling = imageFMario;
      imageTransition = imageTMario;
    } else if (im_c == 1) {
      imageCharacter = imageLuigi;
      imageFalling = imageFLuigi;
      imageTransition = imageTLuigi;
    }
    //This is the Mario button
    if (
      mouseX > 575 &&
      mouseX < 575 + widthNMario &&
      mouseY > height / 3 + 50 &&
      mouseY < height / 3 + 50 + heightNMario
    ) {
      //This is the hover effect
      if (im_c == 0) {
        image(happyMario, 575, height / 3 + 50, 60, 105);
      } else {
        image(selectMario, 575, height / 3 + 50, 50, 95);
      }
    } else if (im_c == 0) {
      image(happyMario, 575, height / 3 + 50, 50, 95);
    } else {
      image(selectMario, 575, height / 3 + 50, 40, 85);
    }
    //This is the Luigi button
    if (
      mouseX > 725 &&
      mouseX < 725 + widthNLuigi &&
      mouseY > height / 3 + 50 &&
      mouseY < height / 3 + 50 + heightNLuigi
    ) {
      if (im_c == 1) {
        //This is the hover effect
        image(happyLuigi, 725, height / 3 + 50, 60, 105);
      } else {
        image(selectLuigi, 725, height / 3 + 50, 60, 105);
      }
    } else if (im_c == 1) {
      image(happyLuigi, 725, height / 3 + 50, 50, 95);
    } else {
      image(selectLuigi, 725, height / 3 + 50, 50, 85);
    }
    selCharacter();
    textSize(36);
    text("Press Space or UpArrow to start", 325, height / 5);
    text("Select your character", 475, height / 3 + 190);
    textSize(34);
    text("Mario", 550, height / 3 + 50);
    text("Luigi", 710, height / 3 + 50);
  }
}
function selCharacter() {
  if (
    mouseX > 575 &&
    mouseX < 575 + widthNMario &&
    mouseY > height / 3 + 50 &&
    mouseY < height / 3 + 50 + heightNMario &&
    mouseIsPressed
  ) {
    // 0 = Mario
    im_c = 0;
    if (!marioSound.isPlaying()) {
      marioSound.play();
    }
    char = true;
  } else if (
    mouseX > 725 &&
    mouseX < 725 + widthNLuigi &&
    mouseY > height / 3 + 50 &&
    mouseY < height / 3 + 50 + heightNLuigi &&
    mouseIsPressed
  ) {
    // 1 = Luigi
    im_c = 1;
    if (!luigiSound.isPlaying()) {
      luigiSound.play();
    }
    char = true;
  }
}

function keyPressed() {
  if ((keyCode == 32 || keyCode == UP_ARROW) && char) {
    if (estado === 0) {
      estado = 1;
      recordAnterior = record;
      score = 0;
      x = 0;
      posY = 50;
      dY = 3;
      im_c = 2;
      wallX = [600, 900, 1200, 1500];
      wallY = [400, 600, 500, 300];
      noCursor();
    } else {
      fall = -15;
      dY = -15;
    }
  }
}
