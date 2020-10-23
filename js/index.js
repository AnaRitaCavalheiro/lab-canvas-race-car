/*window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  const gameboard = {
    canvas: document.createElement('canvas'),
    start: function() {
        this.context = this.canvas.getContext('2d');
        this.interval = setInterval(updateGameBoard, 20); 
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function() {
        clearInterval(this.interval);
    },
   
}

const image = new Image();
image.src = './images/road.png';
/*const backgroundImage = {
  image: image,
  y: 0,
  speed: 1,
  move: function () {
      this.y += this.speed;
      this.y %= canvas.height;   // We draw from negative.Trick to have it seems like it's moving.It will loop to -100 and then come back.
  },
  draw: function () {
    image.addEventListener('load', e => {
      this.image = image;
    })
    ctx.drawImage(this.image, 0, this.y);
  }
}*/

//function updateCanvas () {
 // backgroundImage.move ();
 // backgroundImage.draw();
 // requestAnimationFrame(updateCanvas);
 /*
function startGame() {
  player.draw();

  updateCanvas ()
      }
};

  

class Car {
  constructor (x, y) { 
  this.x = x,
  this.y = y,
  this.speedX = 0,
  this.ctx = gameBoard.canvas.getContext('2d');
  const carImage = new Image();
  carImage.src = './images/car.png';
  carImage.addEventListener('load', () => {
    this.carImage = carImage;
    this.draw();
  });  
 
  }
update() {
    const ctx = boardGame.context;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x);
}
newPos() {
    this.x += this.speedX;
}
moveLeft() {
this.x -= 25;
}
moveRight() {
this.x += 25;
}
draw() {
  this.ctx.drawImage(this.image, this.x, 50, 50);
}
}

let player = new Car(20, 20);
function updateGameBoard() {
  gameBoard.clear();
  player.newPos();
  player.update();
}

document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 37:
      player.speedX -= 1;
      break;
      case 39:
      player.speedX += 1
      break;
  }
})*/


window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };

  let currentGame;
let currentCar;
document.getElementById('game-board').style.display = 'none';
const myCanvas = document.getElementById('the-canvas');
const ctx = myCanvas.getContext('2d');
document.getElementById('start-button').onclick = () => {
    startGame();
}
document.onkeydown = (e) => {
    let whereToGo = e.keyCode;
    currentGame.car.moveCar(whereToGo);
}
function startGame() {
    document.getElementById('game-board').style.display = 'block';
    //Instantiate a new game of the game class
    currentGame = new Game();
    //Instantiate a new car
    currentCar = new Car();
    currentGame.car = currentCar;
    currentGame.car.drawCar();
    updateCanvas();
}
function detectCollision(obstacle) {
    return !((currentCar.y > obstacle.y + obstacle.height) || 
    (currentCar.x + currentCar.width < obstacle.x) || 
    (currentCar.x - currentCar.width  > obstacle.x + obstacle.width))
}
let obstaclesFrequency = 0;
function updateCanvas() {
    ctx.clearRect(0, 0, 500, 600);
    currentGame.car.drawCar();
    obstaclesFrequency++;
    if (obstaclesFrequency % 100 === 1) {
        //Draw an obstacle
        let randomObstacleX = Math.floor(Math.random() * 450);
        let randomObstacleY = 0;
        let randomObstacleWidth = Math.floor(Math.random() * 50) + 20;
        let randomObstacleHeight = Math.floor(Math.random() * 50) + 20;
        let newObstacle = new Obstacle(
            randomObstacleX, 
            randomObstacleY, 
            randomObstacleWidth, 
            randomObstacleHeight);
        currentGame.obstacles.push(newObstacle);
        //console.log(currentGame.obstacles);
    }
    for(let i = 0; i<currentGame.obstacles.length; i++) {
        currentGame.obstacles[i].y += 1;
        currentGame.obstacles[i].drawObstacle();
        if (detectCollision(currentGame.obstacles[i])) {
            alert('BOOOOOMM!')
            obstaclesFrequency = 0;
            currentGame.score = 0;
            document.getElementById('score').innerHTML = 0;
            currentGame.obstacles = [];
            document.getElementById('game-board').style.display = 'none';
        }
        // Obstacle moved outside the canvas
        if (currentGame.obstacles[i].y >= 600) {
            currentGame.obstacles.splice(i, 1);
            currentGame.score++;
            document.getElementById('score').innerHTML = currentGame.score;
        }
    }
    requestAnimationFrame(updateCanvas);
}
}