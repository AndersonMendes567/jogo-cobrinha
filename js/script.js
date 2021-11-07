let canvas = document.getElementById('snake')
let context = canvas.getContext('2d')
let box = 32

let snake = []

snake[0] = {
  x: 8 * box,
  y: 8 * box
}

let direction = 'right'

function mudarDirecao(event) {
  if (event.key == 'ArrowRight') direction = 'right'
  if (event.key == 'ArrowLeft') direction = 'left'
  if (event.key == 'ArrowUp') direction = 'up'
  if (event.key == 'ArrowDown') direction = 'down'
}

window.addEventListener('keydown', mudarDirecao)

function criaBG() {
  context.fillStyle = 'lightGreen'
  context.fillRect(0, 0, 16 * box, 16 * box) // posicao x, posicao y, largura, altura
}

function criaSnack() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'green'
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}

function iniciarJogo() {
  criaBG()
  criaSnack()

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (direction == 'right') snakeX += box
  if (direction == 'left') snakeX -= box
  if (direction == 'up') snakeY -= box
  if (direction == 'down') snakeY += box

  snake.pop()

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

let jogo = setInterval(iniciarJogo, 250) // define um intervalo de tempo depois de executado uma determinada ação
