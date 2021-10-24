console.log('hello')

let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32

let snake = []
snake[0] = {
  x: 8 * box,
  y: 8 * box
}

snake[1] = {
  x: 7 * box,
  y: 8 * box
}

function criaBG() {
  context.fillStyle = 'lightGreen'
  context.fillRect(0, 0, 16 * box, 16 * box)
}

function criaSnack() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'green'
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

criaBG()
criaSnack()
