'use strict';

const score = document.querySelector('.score'),
      start = document.querySelector('.game-start'),
      gameArea = document.querySelector('.game-area'),
      car = document.createElement('div');
car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun); // сработает, когда будет нажата любая кнопка
document.addEventListener('keyup', stopRun); // сработает, когда кнопка будет отжата

const keys = { // объект для управления машиной
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    aArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
};

function checkLineCount(heightLine) { // получаем кол-во полос на высоту элемента
    return document.documentElement.clientHeight / heightLine + 1;
}

function startGame() {
    start.classList.add('hide');
    for(let i = 0; i < checkLineCount(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = `${i * 100}px`; 
        line.y = i * 100;
        gameArea.append(line);
    }

    for(let i = 0; i < checkLineCount(100 * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i + 1);
        enemy.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
        enemy.style.top = `${enemy.y}px`;
        enemy.style.background = 'transparent url(../../assets/image/enemy.png) center/cover no-repeat';
        gameArea.append(enemy);
    }

    setting.start = true;
    gameArea.append(car);
    setting.x = car.offsetLeft; // стартовое положение машины
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame); // запускаем анимацию
}

function playGame() {
    if(setting.start) {
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && setting.x > 1) {
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth - 1)) {
            setting.x += setting.speed;
        }
        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight - 1)) {
            setting.y += setting.speed;
        }
        if(keys.ArrowUp && setting.y > 1) {
            setting.y -= setting.speed;
        }
        car.style.left = `${setting.x}px`;
        car.style.top = `${setting.y}px`;
        requestAnimationFrame(playGame);
    }
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true; // при нажатии на кнопку присваивается true
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}

const moveRoad = () => {
    let lines = document.querySelectorAll('.line'); // находим каждую полосу
    lines.forEach(function(line) {
        line.y += setting.speed; // каждая полоска имеет свою скорость прокрутки
        line.style.top = `${line.y}px`; // берем полосу, его значение топ и присваиваем новую, полученную с учетом скорости
        if(line.y > document.documentElement.clientHeight) { // если координаты больше родительского элемента
            line.y = -100;
        }
    })
}

const moveEnemy = () => {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(rival) {
        rival.y += setting.speed / 2;
        rival.style.top = `${rival.y}px`;

        if(rival.y >= document.documentElement.clientHeight) {
            rival.y = - 150 * setting.traffic;
            rival.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`; // чтобы машины свой путь не повторяли
        }
    });

}