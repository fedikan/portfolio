const game = new Game();

const treasure = new Treasure;
treasure.setRandomPos();

const player = new Player(0, 0) // (0,0) = Initial position (col, row)


let snake = new Snake(),
  score = document.getElementById('score'),
  point = -1;


function setup() {
  let canvas = createCanvas(WIDTH, HEIGHT);
  canvas.parent("canvas");

}


function draw() {
  game.drawGrid();
  player.draw();
  treasure.drawTreasure();
  snake.snakeDraw();

}

function treasureTaken() {
  if (player.col == treasure.col && player.row == treasure.row) {
    point++;
    snake.snakeAppend(player.col, player.row, player.pos);
    treasure.setRandomPos();
    snake.snakeElements.forEach((elements) => {
      if (treasure.col == elements.x && treasure.row == elements.y) {
        treasure.setRandomPos()
        
          let i =0
          while (treasure.row == snake.snakeElements[i].x && treasure.col == snake.snakeElements[i].y){
            treasure.setRandomPos()
            i++;
          }
        
      }
    });
    score.innerHTML = point;
  } else {
    loseCheck(player, snake.snakeElements)
  }
}

function loseCheck(playerState, snakeState) {
  let cuttedSnake = snakeState;
  if (snakeState.length > 1) {
    let cuttedSnake = snakeState.slice[0, snakeState.length - 2];

  }

  cuttedSnake.forEach(function (elements) {
    if (playerState.col == elements.x && playerState.row == elements.y) {

      point = 0;
      score.innerHTML = point;
      player.col = 0;
      player.row = 0;
      player.move = 0;
      snake.snakeElements = [];

    }
  })
}
let difficulty = 1000;
let difficultyInput = document.getElementById('difficulty');
let diffChange = difficultyInput.addEventListener('change', function () {
  difficulty = 1000 - difficultyInput.value;
});


let movementTimer = setTimeout(function makeMove() {
  player.clear();
  switch (player.pos) {
    case 0:
      player.moveDown();
      break;
    case 1:
      player.moveRight();

      break;
    case 2:
      player.moveLeft();
      break;
    case 3:
      player.moveUp();

      break;
  }
  treasureTaken();

  snake.snakeMove(player);
  movementTimer = setTimeout(makeMove, difficulty - point * 20);
}, difficulty - point * 20);



let move = document.addEventListener('keydown', (event) => {
  event.preventDefault();
  player.clear();
  switch (event.key) {
    case "w":
      player.moveUp();
      break;
    case "ц":
      player.moveUp();
      break;
    case "ArrowUp":
      player.moveUp();
      break;
    case "a":
      player.moveLeft();
      break;
    case "ф":
      player.moveLeft();
      break;
    case "ArrowLeft":
      player.moveLeft();
      break;
    case "d":
      player.moveRight();
      break;
    case "в":
      player.moveRight();
      break;
    case "ArrowRight":
      player.moveRight();
      break;
    case "s":
      player.moveDown();
      break;
    case "ы":
      player.moveDown();
      break;
    case "ArrowDown":
      player.moveDown();
      break;

  }

  treasureTaken();
  snake.snakeMove(player);

});