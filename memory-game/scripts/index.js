const game = document.querySelector('.game');
const memoryCards = document.querySelectorAll('.memory-card');
const score = document.querySelector('.score');
const timeScore = document.querySelector('.time');
const startButton = document.querySelector('.start');
const repeatButton = document.querySelector('.play-again');
const modalWindow = document.querySelector('.modal-window');
const finishWindow = document.querySelector('.finish-window');
const overlay = document.querySelector('.overlay');
const record = document.querySelector('.record');
const audioBtn = document.querySelector('.audio');
const imgSrc = document.querySelector('.audio-icon');
const song = document.querySelector('.song');
const tableBody = document.querySelector('tbody');
const tableHead = document.querySelector('thead');
const rows = document.querySelectorAll('row');
const table = document.getElementById('game-table');

let count = 0;
let time = 0;
let flipCard = false;
let firstCard, secondCard;
let lockBoard = false;
let sum = 0;
let numberOfMoves = 0;
let scoreTable = JSON.parse(localStorage.getItem('scoreTable') || '[]');

function gameLogic() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');
  numberOfMoves++;
  if (!flipCard) {
    flipCard = true;
    firstCard = this;
    return;
  } else {
    secondCard = this;
    // flipCard = false;

    checkTheSame();
  }
}

//проверка на совпадение
function checkTheSame() {
  if (firstCard.dataset.game === secondCard.dataset.game) {
    stopFlipCard();
    return;
  }
  comebackFlipCard();
}

//оставить карты перевернутыми, если совпали
function stopFlipCard() {
  firstCard.removeEventListener('click', gameLogic);
  secondCard.removeEventListener('click', gameLogic);
  resetBoard();
  count += 10;
  score.innerHTML = `score: ${count}`;
  sum++;
  if (sum == 6) {
    showFinishWindow();
  }
}

//перевернуть карты обратно, если не совпали
function comebackFlipCard() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    // lockBoard = false;
    resetBoard();
  }, 1000);
  if (count > 0) {
    count -= 2;
    score.innerHTML = `score: ${count}`;
  } else count = 0;
}

//чтобы на одну карту не навешивались, при условии лишние классы
function resetBoard() {
  [flipCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//перемешивание карт
(function shuffle() {
  memoryCards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})();

memoryCards.forEach((card) => card.addEventListener('click', gameLogic));

//прячет модальное окно старта
function hiddenClass() {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
}
startButton.addEventListener('click', hiddenClass);
startButton.addEventListener('click', function () {
  setInterval(timer, 1000);
});

//запускает таймер
function timer() {
  time++;
  timeScore.innerHTML = `time: ${time} sec`;
  //console.log(time);
}

//окошко после игры с таблицей результатов
function showFinishWindow() {
  finishWindow.classList.add('active');
  overlay.classList.remove('hidden');
  record.innerHTML = `You won! <br \/>Number of moves per game: ${numberOfMoves} <br \/> 
  Your score: ${count}. Your time: ${time} seconds`;

  let scoreTableRow = {};
  scoreTableRow.moves = numberOfMoves;
  scoreTableRow.score = count;
  scoreTableRow.gameTime = time;
  scoreTable.unshift(scoreTableRow);
  if (scoreTable.length > 10) {
    scoreTable.pop();
  }
  window.localStorage.setItem('scoreTable', JSON.stringify(scoreTable));

  tableFilling(scoreTable);
}

//играть снова
function repeatGame() {
  finishWindow.classList.remove('active');
  overlay.classList.add('hidden');
  time = 0;
  count = 0;
  sum = 0;
  numberOfMoves = 0;
  score.innerHTML = `score: ${count}`;
  memoryCards.forEach((card) => card.classList.remove('flip'));
  (function shuffle() {
    memoryCards.forEach((card) => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  })();

  memoryCards.forEach((card) => card.addEventListener('click', gameLogic));
  resetTable();
  addTableHead();
}
repeatButton.addEventListener('click', repeatGame);

//аудио-соправождение игры
function musicPlay() {
  song.currentTime = 0;
  audioBtn.classList.add('active');
  song.play();
  imgSrc.src = 'images/volume-xmark-solid.svg';
  imgSrc.style.width = '40px';
}
function musicStop() {
  audioBtn.classList.remove('active');
  song.pause();
  imgSrc.src = 'images/volume-off-solid.svg';
  imgSrc.style.width = '23px';
}
audioBtn.addEventListener('click', () => {
  const playIsActive = audioBtn.classList.contains('active');
  playIsActive ? musicStop() : musicPlay();
});

song.addEventListener('ended', musicPlay);

//кеширование
const pic = [
  'mr-poopybutthole',
  'cucumber',
  'bird-man',
  'jerry',
  'cover-rick-and-morty',
  'morty',
  'cat',
];
function preloadImages() {
  for (let i = 0; i < pic.length; i++) {
    const img = new Image();
    img.src = `pictures/${pic[i]}.png`;
  }
}
preloadImages();
//удаление строк из таблицы
function resetTable() {
  let rowCount = table.rows.length;
  for (var i = 0; i < rowCount; i++) {
    table.deleteRow(0);
  }
}
//добавила заголовок таблицы
function addTableHead() {
  let row = document.createElement('tr');
  let row_data_1 = document.createElement('th');
  row_data_1.innerHTML = 'Moves';
  let row_data_2 = document.createElement('th');
  row_data_2.innerHTML = 'Score';
  let row_data_3 = document.createElement('th');
  row_data_3.innerHTML = 'Game time';

  row.appendChild(row_data_1);
  row.appendChild(row_data_2);
  row.appendChild(row_data_3);
  tableHead.appendChild(row);
}
//заполнение таблицы
function tableFilling(obj) {
  obj.forEach(function (index) {
    let row = document.createElement('tr');
    let row_data_1 = document.createElement('td');
    row_data_1.innerHTML = `${index['moves']}`;
    let row_data_2 = document.createElement('td');
    row_data_2.innerHTML = `${index['score']}`;
    let row_data_3 = document.createElement('td');
    row_data_3.innerHTML = `${index['gameTime']}`;

    row.appendChild(row_data_1);
    row.appendChild(row_data_2);
    row.appendChild(row_data_3);
    tableBody.appendChild(row);
  });
}
console.log(`Ваша отметка - 70 балла(ов) \n
Все пункты выполнены полностью!
`);
