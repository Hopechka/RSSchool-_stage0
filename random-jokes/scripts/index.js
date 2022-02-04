const activeBtn = document.querySelector('.btn');
//const imgSrc = document.querySelector('.img-colorfully');
const imgStatic = document.querySelector('.static');
const imgMove = document.querySelector('.move');
const jokes = document.querySelector('.jokes');

//Pic change
function changePicture() {
  //imgSrc.src = 'images/move.gif';
  imgMove.classList.toggle('active');
  imgStatic.classList.toggle('active');
  activeBtn.classList.toggle('active');
  body.classList.toggle('active');
}

activeBtn.addEventListener('click', changePicture);

// Получение данных от API
const url = 'https://type.fit/api/quotes';
async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data[0].text);
  showData(data);
}
getData();

let currentJoke = 0;
function showData(data) {
  currentJoke < data.length - 1 ? currentJoke++ : (currentJoke = 0);
  jokes.textContent = data[currentJoke].text;
  window.localStorage.setItem('joke', currentJoke);
}

activeBtn.addEventListener('click', getData);

function getLocalStorage() {
  currentJoke = localStorage.getItem('joke');
  console.log(currentJoke);
  getData;
}
window.addEventListener('load', getLocalStorage);
