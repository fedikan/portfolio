class Game {
  drawGrid() {
    for (let i = 0; i <= WIDTH; i += SQUARE_SIDE) {
      line(i, 0, i, WIDTH);
      line(0, i, HEIGHT, i);
    }
  }

}

class Snake {
  snakeElements = [];
  
  snakeAppend(xPos, yPos,pos) {
    this.snakeElements.push({
      x: xPos,
      y: yPos,
      pos: pos
    })
  }
  snakeDraw() {
    this.snakeElements.forEach(function(elements){ 
      let img = new Image();
      img.addEventListener("load", function () {}, false);
      let context = canvas.getContext('2d');
      switch (elements.pos) {
        case 0:
          img.src = 'assets/character-down.png';
          break;
        case 1:
          img.src = 'assets/character-right.png';
          break;
        case 2:
          img.src = 'assets/character-left.png';
          break;
        case 3:
          img.src = 'assets/character-up.png';
          break;
      }
     context.drawImage(img, (elements.x) * (SQUARE_SIDE), (elements.y) * (SQUARE_SIDE), SQUARE_SIDE, SQUARE_SIDE);}
     
     );
  }
  snakeMove(someone){
    

      this.snakeElements.push({ x:someone.col,y:someone.row,pos:someone.pos})
      this.snakeElements.splice(0,1);
  }
}
class Player {
  pos = 0;
  move = 0;
  constructor(col, row) {
    this.col = col;
    this.row = row;
  }
  moveDown() {
    this.pos = 0;
    if (this.row < 9) {
      this.move++;
      this.row++;
    }
  }
  moveRight() {
    this.pos = 1;

    if (this.col < 9) {
      this.move++
      this.col++;
    }
  }
  moveLeft() {
    this.pos = 2;

    if (this.col > 0) {
      this.move++;
      this.col--;
    }
  }
  moveUp() {
    this.pos = 3;

    if (this.row > 0) {
      this.move++;
      this.row--;
    }
  }
  draw() {
    let img = new Image();
    img.addEventListener("load", function () {}, false);
    switch (this.pos) {
      case 0:
        img.src = 'assets/character-down.png';
        break;
      case 1:
        img.src = 'assets/character-right.png';
        break;
      case 2:
        img.src = 'assets/character-left.png';
        break;
      case 3:
        img.src = 'assets/character-up.png';
        break;
    }
    let context = canvas.getContext('2d');
    context.drawImage(img, (this.col) * (SQUARE_SIDE), (this.row) * (SQUARE_SIDE), SQUARE_SIDE, SQUARE_SIDE);
  }

  clear() {
    let context = canvas.getContext('2d');
    context.clearRect(0, 0, WIDTH, HEIGHT);
  }
}

class Treasure {

  col = 0
  row = 0

  setRandomPos() {
    this.col = Math.random().toFixed(1) * 10,
      this.row = Math.random().toFixed(1) * 10;
    if (this.col == 10) {
      this.col--;
    }
    if (this.row == 10) {
      this.row--;
    }
  }
  drawTreasure() {
    let treasure = new Image();
    treasure.addEventListener("load", function () {}, false);
    treasure.src = 'assets/treasure.png';
    let context = canvas.getContext('2d');
    context.drawImage(treasure, (this.col) * (SQUARE_SIDE), (this.row) * (SQUARE_SIDE), SQUARE_SIDE, SQUARE_SIDE);
    // context.clearRect((this.col) * (SQUARE_SIDE), (this.row) * (SQUARE_SIDE), 20, 50);

  }
}