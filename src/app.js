'use strict'

let width = 15;

const grid = document.querySelector('.grid');
const result = document.querySelector('.result');
const score = document.querySelector('.score');

let scoreValue = 0;
let invaderId;
let direction = 1;
let goingRight = true;
let speedInvaders = 500;

for (let i = 0; i < 225; i++) {
    let square = document.createElement('div');
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll('.grid div'));





let currentShooterIndex = 202;
squares[currentShooterIndex].classList.add('shooter');

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter');

    switch (e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) {
                currentShooterIndex -= 1;
            }
            break;
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) {
                currentShooterIndex += 1;
            }
            break;
    }

    squares[currentShooterIndex].classList.add('shooter');
}

document.addEventListener('keydown', moveShooter);







const invaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];

function drawInvaders() {
    for (let i = 0; i < invaders.length; i++) {
        squares[invaders[i]].classList.add('invaders');

    }
}

function removeInvaders() {
    for (let i = 0; i < invaders.length; i++) {
        squares[invaders[i]].classList.remove('invaders');

    }
}

drawInvaders();

function moveInvaders() {
    let leftEdge = invaders[0] % width === 0;
    let rightEdge = invaders[invaders.length - 1] % (width) === width - 1;

    removeInvaders();

    if (rightEdge && goingRight) {
        for (let i = 0; i < invaders.length; i++) {
            invaders[i] += width + 1
        }
        direction = -1
        goingRight = false
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < invaders.length; i++) {
            invaders[i] += width - 1
        }
        direction = 1
        goingRight = true
    }

    for (let i = 0; i < invaders.length; i++) {
        invaders[i] += direction
    }

    drawInvaders();

    if (squares[currentShooterIndex].classList.contains('invaders', 'shooter')) {
        clearInterval(invaderId);
        result.innerHTML = 'Game Over !'
        document.removeEventListener('keyup', shoot);
        document.removeEventListener('keydown', moveShooter);
    }

    if (invaders[invaders.length] > 225) {
        clearInterval(invaderId);
        result.innerHTML = 'Game Over !'
        document.removeEventListener('keyup', shoot);
        document.removeEventListener('keydown', moveShooter);
    }
}

invaderId = setInterval(moveInvaders, speedInvaders);



let fireHandler = document.addEventListener('keyup', shoot);
function shoot(e) {
    if (e.key === 'ArrowUp') {
        let fireIndex = currentShooterIndex;

        let fireInterval = setInterval(() => {
            squares[fireIndex].classList.remove('fire');
            fireIndex -= 15;

            if (fireIndex < 0) {
                clearInterval(fireInterval);
                return;
            }

            squares[fireIndex].classList.add('fire');


            if (squares[fireIndex].classList.contains('invaders', 'fire')) {
                squares[fireIndex].classList.remove('fire');
                squares[fireIndex].classList.remove('invaders');
                invaders.splice(invaders.indexOf(fireIndex), 1)
                clearInterval(fireInterval)
                scoreValue += 1;
                score.innerHTML = scoreValue;
            }
        }, 100)

    }
}

