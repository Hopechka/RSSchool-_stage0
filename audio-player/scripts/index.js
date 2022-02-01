const player = document.querySelector('.player');
const playBtn = document.querySelector('.button-play');
const imgSrc = document.querySelector('.img-src');
const prevBtn = document.querySelector('.button-prev');
const nextBtn = document.querySelector('.button-next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress-container');
const slider = document.querySelector('.slider');
const singer = document.querySelector('.singer');
const songName = document.querySelector('.name');
const albumPicImg = document.querySelector('.album-pic-img');

//Название песен
const songs = ['dontstartnow', 'lemonade'];
const singers = {
  dontstartnow: { name: 'Dua Lipa', singer: "Don't start now" },
  lemonade: { name: "Don't hurt Yourself", singer: 'Beyonce' },
};

//Песня по умолчанию
let songIndex = 0;

//Init
function loadSong(song) {
  songName.innerHTML = singers[song].name;
  singer.innerHTML = singers[song].singer;
  audio.src = `audio/${song}.mp3`;
  albumPicImg.src = `images/pics/${song}.png`;
  main.style.background = `url(./images/pics/${song}.png) no-repeat`;
  main.style.backgroundSize = 'cover';
  main.style.backgroundPosition = 'center center';
}
loadSong(songs[songIndex]);

//Play song
function PlaySong() {
  player.classList.add('active');
  albumPicImg.classList.add('active');
  audio.play();
  imgSrc.src = 'images/player-btns/pause.png';
}

//Pause song
function PauseSong() {
  player.classList.remove('active');
  albumPicImg.classList.remove('active');
  audio.pause();
  imgSrc.src = 'images/player-btns/play.png';
}

playBtn.addEventListener('click', () => {
  const playIsActive = player.classList.contains('active');
  playIsActive ? PauseSong() : PlaySong();
});

//Next song
function nextSong() {
  console.log(songIndex);
  songIndex < songs.length - 1 ? songIndex++ : (songIndex = 0);
  loadSong(songs[songIndex]);
  const playIsActive = player.classList.contains('active');
  playIsActive ? PlaySong() : PauseSong();
}
nextBtn.addEventListener('click', nextSong);

//Prev song
function prevSong() {
  songIndex == 0 ? (songIndex = songs.length - 1) : songIndex--;
  loadSong(songs[songIndex]);
  const playIsActive = player.classList.contains('active');
  playIsActive ? PlaySong() : PauseSong();
}
prevBtn.addEventListener('click', prevSong);
