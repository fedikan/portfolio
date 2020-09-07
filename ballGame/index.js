const FONT_SIZE = 48
const WIN_PHRASE = 'U win!'
const LOSE_PHRASE = 'U lose!'
const VICTORY_SCORE = 30
const CANVAS_SIZE = 500
const START_DIFFICULTY = 1
const BALL_RADIUS = 50
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const restartBtn = document.querySelector('.restart')


class Enemy {
    constructor() {
        this.positions = [1000, 420]
        this.counter = 0
        this.difficulty = START_DIFFICULTY + this.score / 10
    }

    move(difficulty) {
        if (this.positions[0] > -30) {
            this.positions[0] -= difficulty
        } else {
            this.setHeight()
            this.positions[0] = CANVAS_SIZE
            this.counter++
        }
    }

    setHeight() {
        const height = Math.random().toFixed(2) * 100
        this.positions[1] = 400 + height
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 0, 0)';
        ctx.fillRect(this.positions[0], this.positions[1], 30, CANVAS_SIZE - (CANVAS_SIZE - this.positions[1]));
    }

}

class Player {
    constructor() {
        this.height = 0
        this.isJumping = false
        this.isFalling = false
        this.positions = [250, CANVAS_SIZE - BALL_RADIUS - this.height]
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.positions[0], this.positions[1], BALL_RADIUS, Math.PI * 2, 0, true);
        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.fill()
    }

    move(difficulty) {
        if (this.isJumping) {
            this.height += difficulty
            this.positions[1] = CANVAS_SIZE - BALL_RADIUS - this.height
        } else if (this.isFalling) {
            this.height -= difficulty
            this.positions[1] = CANVAS_SIZE - BALL_RADIUS - this.height
        }
        this.heightCheck(difficulty)
        this.playerControl()
    }

    heightCheck(difficulty) {
        if (this.height > 199) {
            this.isJumping = false
            this.isFalling = true
        } else if (this.height < difficulty + 0.1 && this.height > 0 & this.isFalling == true) {
            this.isFalling = false
            this.height = 0
            this.positions[1] = CANVAS_SIZE - BALL_RADIUS - this.height
        }
    }

    playerControl() {
        if (!this.isJumping && !this.isFalling) {
            document.addEventListener('keydown', this.jumpCheck.bind(this))
        } else {
            document.removeEventListener('keydown', this.jumpCheck.bind(this))
        }
    }

    jumpCheck(event) {
        if (event.code == 'Space') {
            this.jump()
        }
    }

    jump() {
        if (!this.isJumping && !this.isFalling) {
            this.isJumping = true
        }
    }


}
class Game {
    constructor(player, enemy) {
        this.player = player
        this.enemy = enemy
        this.score = 0
        this.difficulty = START_DIFFICULTY
    }

    collisionCheck() {
        if (Math.sqrt((this.player.positions[0] - this.enemy.positions[0]) ** 2 + (this.player.positions[1] - this.enemy.positions[1]) ** 2) < 51 ||
            Math.sqrt((this.player.positions[0] - (this.enemy.positions[0] + 30)) ** 2 + (this.player.positions[1] - this.enemy.positions[1]) ** 2) < 51) {
            return true
        } else return false
    }

    victoryCheck() {
        if (this.score == VICTORY_SCORE) {
            return true
        }
        return false
    }

    victory() {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
        ctx.font = FONT_SIZE + 'px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText(WIN_PHRASE, 190, 250)
    }

    drawGame() {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
        this.enemy.move(this.difficulty)
        this.enemy.draw()
        this.player.move(this.difficulty)
        this.player.draw()
        this.scoreCheck()
    }

    drawScore() {
        ctx.font = FONT_SIZE * 2 + 'px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        if (this.score < 10) {
            ctx.fillText(this.score, 235, 100)
        } else {
            ctx.fillText(this.score, 210, 100)
        }
    }

    scoreCheck() {
        if (this.enemy.positions[0] > CANVAS_SIZE / 2 && this.enemy.positions[0] < (CANVAS_SIZE / 2 + this.difficulty + 0.1)) {
            this.score++
            this.increaseDifficulty(this.score)
        }
    }

    increaseDifficulty() {
        this.difficulty = START_DIFFICULTY + this.score / 10
    }

    gameOver() {
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
        ctx.font = FONT_SIZE + 'px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText(LOSE_PHRASE, 190, 250)
    }

}


function playGame(game, gameRender) {
    restartBtn.style.opacity = '0'
    restartBtn.style.display = 'none'

    if (game.collisionCheck()) {
        clearInterval(gameRender)

        game.gameOver()
        restartBtn.style.display = 'flex'
        restartBtn.style.opacity = '1'

    } else if (game.victoryCheck()) {
        game.victory()
    } else {
        game.drawGame()
    }

    game.drawScore()
}
const ball = new Player()
const block = new Enemy()
const game = new Game(ball, block)

let gameRender = setInterval(() => {
    playGame(game, gameRender)
}, 0)

restartBtn.addEventListener('click', () => {
    const ball = new Player()
    const block = new Enemy()
    const game = new Game(ball, block)


    let gameRender = setInterval(() => playGame(game, gameRender), 0)
})