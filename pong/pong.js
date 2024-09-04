const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
const paddleSpeed = 4;
const ballSpeed = 5;

let leftPaddle = { x: 0, y: canvas.height / 2 - paddleHeight / 2 };
let rightPaddle = { x: canvas.width - paddleWidth, y: canvas.height / 2 - paddleHeight / 2 };
let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: ballSpeed, dy: ballSpeed };

function drawPaddle(x, y) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ballSize > canvas.height || ball.y - ballSize < 0) {
        ball.dy *= -1;
    }

    if (ball.x - ballSize < 0) {
        ball.dx *= -1;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    } else if (ball.x + ballSize > canvas.width) {
        ball.dx *= -1;
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }

    if (
        (ball.x - ballSize < leftPaddle.x + paddleWidth &&
         ball.y > leftPaddle.y && ball.y < leftPaddle.y + paddleHeight) ||
        (ball.x + ballSize > rightPaddle.x &&
         ball.y > rightPaddle.y && ball.y < rightPaddle.y + paddleHeight)
    ) {
        ball.dx *= -1;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(leftPaddle.x, leftPaddle.y);
    drawPaddle(rightPaddle.x, rightPaddle.y);
    drawBall(ball.x, ball.y);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && rightPaddle.y > 0) {
        rightPaddle.y -= paddleSpeed;
    }
    if (e.key === 'ArrowDown' && rightPaddle.y < canvas.height - paddleHeight) {
        rightPaddle.y += paddleSpeed;
    }
    if (e.key === 'w' && leftPaddle.y > 0) {
        leftPaddle.y -= paddleSpeed;
    }
    if (e.key === 's' && leftPaddle.y < canvas.height - paddleHeight) {
        leftPaddle.y += paddleSpeed;
    }
});

gameLoop();
