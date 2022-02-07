const player = document.querySelector('.player');
const playBtn = document.querySelector('.button-play');
const imgSrc = document.querySelector('.img-src');
const prevBtn = document.querySelector('.button-prev');
const nextBtn = document.querySelector('.button-next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const singer = document.querySelector('.singer');
const songName = document.querySelector('.name');
const albumPicImg = document.querySelector('.album-pic-img');
const songLength = document.querySelector('.length');
const current = document.querySelector('.current');

//Название песен
const songs = ['dontstartnow', 'lemonade', 'pesenkamyshonka'];
const singers = {
  dontstartnow: { name: "Don't start now", singer: 'Dua Lipa' },
  lemonade: { name: "Don't hurt Yourself", singer: 'Beyonce' },
  pesenkamyshonka: { name: 'Песенка мышонка', singer: 'Состояние души' },
};

//Песня по умолчанию
let playNum = 0;

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
loadSong(songs[playNum]);

//Play audio
function PlaySong() {
  //audio.currentTime = 0;
  player.classList.add('active');
  albumPicImg.classList.add('active');
  audio.play();
  imgSrc.src = 'images/player-btns/pause.png';
}

//Pause audio
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
function playNext() {
  playNum < songs.length - 1 ? playNum++ : (playNum = 0);
  loadSong(songs[playNum]);
  const playIsActive = player.classList.contains('active');
  playIsActive ? PlaySong() : PauseSong();
}
nextBtn.addEventListener('click', playNext);

//Prev song
function playPrev() {
  playNum == 0 ? (playNum = songs.length - 1) : playNum--;
  loadSong(songs[playNum]);
  const playIsActive = player.classList.contains('active');
  playIsActive ? PlaySong() : PauseSong();
}
prevBtn.addEventListener('click', playPrev);

//Progress bar
function updateProgress(event) {
  const { duration, currentTime } = event.srcElement; // duration - длительность, currentTime - текущее время
  const minDuration = Math.floor((duration / 60) << 0);
  const secDuration = Math.floor(duration % 60) << 0;
  songLength.innerHTML = `${minDuration}:${secDuration}`;
  //console.log(duration);
  const minCurrentTime = Math.floor((currentTime / 60) << 0);
  const secCurrentTime = Math.floor(currentTime % 60) << 0;
  if (secCurrentTime < 10) {
    current.innerHTML = `${minCurrentTime}:0${secCurrentTime}`;
  } else {
    current.innerHTML = `${minCurrentTime}:${secCurrentTime}`;
  }
  //console.log(currentTime);
  const progressPresent = (currentTime / duration) * 100;
  myRange.value = progressPresent;
}
audio.addEventListener('timeupdate', updateProgress); // 'timeupdate'- св-во аудио

//Set progress
function setProgress(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  //console.log(width);
  //console.log(clickX);
  //console.log(duration);
  audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);

//Continue play
audio.addEventListener('ended', playNext);

//keyboard control
document.addEventListener('keydown', (e) => {
  try {
    // отключаем стандартный функционал клавиатуры
    e.preventDefault();
    // пробел
    if (e.code == 'Space') {
      // пуск/пауза
      //audio.paused ? audio.play() : audio.pause();
      audio.paused ? PlaySong() : PauseSong();
      // enter
    } else if (e.key == 'Enter') {
      // стоп
      audio.load();
      // стрелка вправо
    } else if (e.key == 'ArrowRight') {
      // время воспроизведения + 10 секунд
      audio.currentTime += 10;
      // стрелка влево
    } else if (e.key == 'ArrowLeft') {
      // время воспроизведения - 10 секунд
      audio.currentTime -= 10;
    } else if (e.key == 'ArrowUp') {
      // стрелка вверх
      playNext();
    } else if (e.key == 'ArrowDown') {
      // стрелка ввниз
      playPrev();
    }
  } catch {
    return;
  }
});

console.log(`Добавила переключение при помощи клавиши пробел это плей-пауза, \n
  стрелки вправо-влево, чтобы листать, \n
  Enter - остановить воспроизведение, чтобы листать. \n
 Ваша отметка - 70 балла(ов)`);
