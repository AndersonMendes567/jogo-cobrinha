let record = document.getElementById('record')
let score = document.getElementById('score')
let qtScores = 0

if (localStorage.getItem('record') == null) {
  localStorage.setItem('record', '0')
}

record.innerText = `Recorde: ${localStorage.getItem('record')}`
let canvas = document.getElementById('snake')

let smallDisplay = window.matchMedia('(max-width: 550px)')
if (smallDisplay.matches) {
  canvas.style.width = '320px'
  canvas.style.height = '320px'
  document.documentElement.classList.add('small')
}

let context = canvas.getContext('2d')
let box = 32

const btnLeft = document.querySelector('.left')
const btnUp = document.querySelector('.up')
const btnRight = document.querySelector('.right')
const btnDown = document.querySelector('.down')

let snake = []

snake[0] = {
  x: 8 * box,
  y: 8 * box
}

let direction = 'right'

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function mudarDirecao(event) {
  console.log(event.keyCode)
  if (event.key == 'ArrowRight' && direction != 'left') direction = 'right'
  if (event.key == 'ArrowLeft' && direction != 'right') direction = 'left'
  if (event.key == 'ArrowUp' && direction != 'down') direction = 'up'
  if (event.key == 'ArrowDown' && direction != 'up') direction = 'down'
}

window.addEventListener('keydown', mudarDirecao)

// Controle por Botões

btnLeft.addEventListener('click', function () {
  if (direction != 'right') direction = 'left'
})

btnUp.addEventListener('click', function () {
  if (direction != 'down') direction = 'up'
})

btnRight.addEventListener('click', function () {
  if (direction != 'left') direction = 'right'
})

btnDown.addEventListener('click', function () {
  if (direction != 'up') direction = 'down'
})

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

function drawFood() {
  context.fillStyle = 'red'
  context.fillRect(food.x, food.y, box, box)
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction != 'left') snake[0].x = 0
  if (snake[0].x < 0 && direction != 'right') snake[0].x = 16 * box
  if (snake[0].y > 15 * box && direction != 'up') snake[0].y = 0
  if (snake[0].y < 0 && direction != 'down') snake[0].y = 16 * box

  criaBG()
  criaSnack()
  drawFood()

  let snakeX = snake[0].x
  let snakeY = snake[0].y

  if (direction == 'right') snakeX += box
  if (direction == 'left') snakeX -= box
  if (direction == 'up') snakeY -= box
  if (direction == 'down') snakeY += box

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop()
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box
    food.y = Math.floor(Math.random() * 15 + 1) * box
    qtScores += 100
    score.innerText = `Pontuação: ${qtScores}`
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo)
      if (qtScores > parseInt(localStorage.getItem('record'))) {
        localStorage.setItem('record', `${qtScores}`)
      }
      alert('Game Over! Que pena, você PERDEU!  :(')
      record.innerText = `Recorde: ${localStorage.getItem('record')}`
    }
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

let jogo = setInterval(iniciarJogo, 200) // define um intervalo de tempo depois de executado uma determinada ação
