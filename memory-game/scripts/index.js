const game = document.querySelector('.game');
const memoryCards = document.querySelectorAll('.memory-card');
const score = document.querySelector('.score');
let count = 0;

let flipCard = false;
let firstCard, secondCard;

function gameLogic() {
  this.classList.add('flip');

  if (!flipCard) {
    flipCard = true;
    firstCard = this;
    return;
    console.log(flipCard);
  } else {
    secondCard = this;
    flipCard = false;

    checkTheSame();
  }

  console.log('second card');
}

function checkTheSame() {
  if (firstCard.dataset.game === secondCard.dataset.game) {
    stopFlipCard();
    console.log('the same');
    return;
  }
  comebackFlipCard();
}

function stopFlipCard() {
  firstCard.removeEventListener('click', gameLogic);
  secondCard.removeEventListener('click', gameLogic);
  count += 10;
  score.innerHTML = `points: ${count}`;
}

function comebackFlipCard() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
  }, 1000);
  if (count > 0) {
    count -= 2;
    score.innerHTML = `points: ${count}`;
  } else count = 0;
}

memoryCards.forEach((card) => card.addEventListener('click', gameLogic));
