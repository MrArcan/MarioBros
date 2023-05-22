let fondoJuego
let fondoInicio
let x = 0
let posY = 50
let dY = 3
let estado = 0
let record = 0
let wallX = [600, 900]
let wallY = [400, 600]
let recordAnterior = 0
let puntaje = 0
let musicaRecord
let musicaJuego
let imagenPared
let fall = 0;
let imageMario, imageLuigi;
let imageFMario, imageFLuigi;
let imageTMario, imageTLuigi;
let myFont
let charactet = 0
let buttonM, buttonL;

function preload() { 
  fondoJuego = loadImage('./img/Backgrounds/overworld.jpg')
  fondoInicio = loadImage('./img/Backgrounds/castle.jpg')
  imagenPared = loadImage('./img/pared.png')
  imageMario = loadImage('./img/characters/mario.png')
  imageFMario = loadImage('./img/characters/marioFalling.png')
  imageTMario = loadImage('./img/characters/marioTFalling.png')
  imageLuigi = loadImage('./img/characters/luigi.png')
  imageFLuigi = loadImage('./img/characters/luigiFalling.png')
  imageTLuigi = loadImage('./img/characters/luigiTFalling.png')
  myFont = loadFont("./fond/SuperMario.ttf");
}

function setup() {
  // put setup code here
  createCanvas(1200,800)
  textFont(myFont);
  textSize(34)
}

function draw() {
  // put drawing code here
  if (estado === 1) {
    imageMode(CORNER)
    image(fondoJuego,x,0, fondoJuego.width, 800)
    image(fondoJuego,x+fondoJuego.width,0, fondoJuego.width, 800)
    x = x - 6
    //Movimiento del personaje
    dY = dY + 1  //dy += 1
    posY = posY + dY
    //obstaculos
    for (let i = 0; i < wallX.length; i++) {
      //Obstáculos
      imageMode(CENTER)
      image(imagenPared,wallX[i],wallY[i]-500)
      image(imagenPared,wallX[i],wallY[i]+500)

      //Generar nuevas coordenadas para las paredes
      if (wallX[i] < 0) {
        wallX[i] = width
        wallY[i] = random(200, 600)
      }
      //Agregar puntaje
      if (wallX[i] === 300) {
        puntaje = puntaje + 1
        record = max(puntaje, record)
      }

      //Colisiones
      if (posY < 0 || posY > height || (abs(wallX[i]-300) < 50 && abs(posY - wallY[i])  > 100)) {
        estado  = 0
        // musicaJuego.stop()
        cursor()
      }

      wallX[i] += -6 //Desplazamiento de las paredes
    }



    if (x < -fondoJuego.width) {
      x = 0
    }
    //Desplegamos al personaje
    // //Animation
    if(fall < -5){
      image(imageCharacter,300,posY,50,50)
      fall++
    }else if(fall < 0){
      image(imageTransition,300,posY,50,50)
      fall++
    }else{
      image(imageFalling,300,posY,50,50)
    }
    //Desplegamos el puntaje
    text("Puntaje: " + puntaje, width/2-50, 50)

  } else {  //estado = 0
    
    imageCharacter = imageMario
    imageFalling = imageFMario
    imageTransition = imageTMario
    imageMode(CORNER)
    image(fondoInicio,0,0, fondoInicio.width, 800)
    text("Record: " + record, 100 , 450)
    text("Selecciona personaje", fondoJuego.width/2-100, 300)
    // buttonM = createButton("MARIO");
    // buttonL = createButton("LUIGI");
    // buttonM.position(575, 720);
    // buttonL.position(725, 720);
    // buttonM.mousePressed(changeCharacter(1));
    // buttonL.mousePressed(changeCharacter(2));
  }
}

// function changeCharacter(value){
//   if(value == 1){
    // imageCharacter = imageMario
    // imageFalling = imageFMario
    // imageTransition = imageTMario
//   }else{
//     imageCharacter = imageLuigi
//     imageFalling = imageFLuigi
//     imageTransition = imageTLuigi
//   }
// }
// function keyPress(){
//   if(keyCode == BACKSPACE){

//   }else{

//   }
// }

function mousePressed() {
  if (estado === 0) {
    estado = 1
    recordAnterior = record
    puntaje = 0
    x = 0
    posY = 50
    dY = 3
    wallX = [600, 900]
    wallY = [400, 600] 
    noCursor()  
    // if (musicaRecord.isPlaying()) {
    //   musicaRecord.stop()
    // }
    //musicaJuego.play()

  } else {
    fall = -15;
    dY = -15
  }
}