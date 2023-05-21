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
let imagenPersonaje
let imagenPared

function preload() { 
  fondoJuego = loadImage('./img/Backgrounds/overworld.jpg')
  fondoInicio = loadImage('./img/Backgrounds/castle.jpg')
  // musicaRecord = loadSound('./sounds/aplauso.wav')
  // musicaJuego = loadSound('./sounds/boombayah.mp3')
  imagenPersonaje = loadImage('./img/characters/mario.png')
  imagenPared = loadImage('./img/pared.png')
}

function setup() {
  // put setup code here
  createCanvas(1200,800)
  textSize(34)
}

function draw() {
  // put drawing code here
  //background(0)
  //square(150,150,100)
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
    //text("👻",300,posY)
    image(imagenPersonaje,300,posY,50,50)
    //Desplegamos el puntaje
    text("Puntaje: " + puntaje, width/2-50, 50)

  } else {  //estado = 0
    //imageMode(CENTER)
    imageMode(CORNER)
    background(0)
    image(fondoInicio,0,0,600,800)
    text("Record: " + record, 60, 450)
    // if (recordAnterior != record) {
    //   if (!musicaRecord.isPlaying()) {
    //     musicaRecord.play()
    //   }
    // }
  }
}

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
    dY = -15
  }
}