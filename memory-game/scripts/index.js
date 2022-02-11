const game = document.querySelector('.game');
const memoryCards = document.querySelectorAll('.memory-card');
const score = document.querySelector('.score');
const timeScore = document.querySelector('.time');
const startButton = document.querySelector('.start');
const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');

let count = 0;
let timeStart = 1;
let time = 0;
let flipCard = false;
let firstCard, secondCard;
let lockBoard = false;

function gameLogic() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

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

function checkTheSame() {
  if (firstCard.dataset.game === secondCard.dataset.game) {
    stopFlipCard();
    return;
  }
  comebackFlipCard();
}

function stopFlipCard() {
  firstCard.removeEventListener('click', gameLogic);
  secondCard.removeEventListener('click', gameLogic);
  resetBoard();
  count += 10;
  score.innerHTML = `score: ${count}`;
}

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
  console.log(time);
}
//чтобы на одну карту не навешивались, при условии лишние классы
function resetBoard() {
  [flipCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// if (timeStart === 1) {
//   memoryCards.forEach((card) =>
//     card.addEventListener('click', function () {
//       setInterval(timer, 1000);
//     })
//   );
//   timeStart -= 1;
//   console.log('я тут');
//   console.log(timeStart);
// } else if (timeStart < 1) {
//   console.log('теперь я тут -1');
//   console.log(timeStart);
// }

// timer = setInterval(function () {
//   time++;
//   timeScore.innerHTML = `time: ${time} sec`;
// }, 1000);
// activeBtn.addEventListener('click', function () {
//   setTimeout(changePicture, 2000);
// });
