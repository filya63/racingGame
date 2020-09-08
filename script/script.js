'use strict';

const score = document.querySelector('.score'),
      start = document.querySelector('.game-start'),
      gameArea = document.querySelector('.game-area'),
      car = document.createElement('div');

car.classList.add('car');

start.addEventListener('click', startGame);

function startGame() {
    start.classList.add('hide');
    requestAnimationFrame(playGame);
    gameArea.append(car);
}

document.addEventListener('keydown', startRun); // сработает, когда будет нажата любая кнопка
document.addEventListener('keyup', stopRun); // сработает, когда кнопка будет отжата

const keys = { // объект для управления машиной
    arrowUp: false,
    arrowDown: false,
    arrowRight: false,
    arrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 3
}

function playGame() {
    console.log('Play Game');
    if(setting.start === true) {
        requestAnimationFrame(playGame);
    }
}

function startRun(event) {
    event.preventDefault();
    setting.start = true;
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}