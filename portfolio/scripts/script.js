import i18Obj from './translate.js';
var lang = 'en';
var theme = 'light';

//--------------------------------------------------------------------------

// Добавила плавность для якорей
const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute('href').slice(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
}

//-------------------------------------------------------------------------

// Добавила активность для гамбургер-меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('#menu-nav');

function toggleMenu() {
  hamburger.classList.toggle('open');
  navMenuClose();
}
hamburger.addEventListener('click', toggleMenu);

function navMenuClose() {
  navMenu.classList.toggle('close');
}

function toggleMenClose() {
  hamburger.classList.remove('open');
}

function menuClose() {
  navMenu.classList.remove('close');
  toggleMenClose();
}
navMenu.addEventListener('click', menuClose);

//-------------------------------------------------------------------------

// Поменять изображение на другой сезон

/*const portfolioBtn = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio-image');
//Зима
portfolioBtn[0].addEventListener('click', () => {
  portfolioImages.forEach(
    (img, index) => (img.src = `pictures/content-photo/winter/${index + 1}.jpg`)
  );
});
//Весна
portfolioBtn[1].addEventListener('click', () => {
  portfolioImages.forEach(
    (img, index) => (img.src = `pictures/content-photo/spring/${index + 1}.jpg`)
  );
});
//Лето
portfolioBtn[2].addEventListener('click', () => {
  portfolioImages.forEach(
    (img, index) => (img.src = `pictures/content-photo/summer/${index + 1}.jpg`)
  );
});
//Осень
portfolioBtn[3].addEventListener('click', () => {
  portfolioImages.forEach(
    (img, index) => (img.src = `pictures/content-photo/autumn/${index + 1}.jpg`)
  );
});*/
const portfolioBtns = document.querySelector('.carousel');
const portfolioImages = document.querySelectorAll('.portfolio-image');
function changeImage(event) {
  if (event.target.classList.contains('portfolio-btn')) {
    //event.target.classList.remove('active');
    //event.target.classList.add('active');
    portfolioImages.forEach(
      (img, index) =>
        (img.src = `pictures/content-photo/${event.target.dataset.season}/${
          index + 1
        }.jpg`)
    );
  }
}
portfolioBtns.addEventListener('click', changeImage);

//-------------------------------------------------------------------------

//Кеширование изображений
const seasons = ['winter', 'spring', 'summer', 'autumn'];
function preloadImages() {
  for (let i = 1; i <= 6; i++) {
    const img = new Image();
    seasons.forEach((index) => {
      img.src = `pictures/content-photo/${index}/${i}.jpg`;
    });
  }
}
preloadImages();

//-------------------------------------------------------------------------

//Подсветка активной кнопки

function changeBtnColor(event) {
  const portfolioBtn = document.querySelectorAll('.portfolio-btn');
  portfolioBtn.forEach((index) => {
    index.classList.remove('active');
  });
  if (event.target.classList.contains('portfolio-btn')) {
    event.target.classList.add('active');
  }
}
portfolioBtns.addEventListener('click', changeBtnColor);

//-------------------------------------------------------------------------

//Перевод страницы на два языка

/*const langChange = document.querySelector('.lang-link');
function getTranslate(event) {
  const langTextChange = document.querySelectorAll('[data-i18]');
  if (event.target.classList.contains('en')) {
    langTextChange.forEach((index) => {
      if (index.placeholder) {
        index.placeholder = i18Obj.en[index.dataset.i18];
        index.textContent = '';
      } else {
        index.textContent = i18Obj.en[index.dataset.i18];
      }
    });
  }
  if (event.target.classList.contains('ru')) {
    langTextChange.forEach((index) => {
      if (index.placeholder) {
        index.placeholder = i18Obj.ru[index.dataset.i18];
        index.textContent = '';
      } else {
        index.textContent = i18Obj.ru[index.dataset.i18];
      }
    });
  }
}
langChange.addEventListener('click', getTranslate);*/

const langChange = document.querySelector('.lang-link');
function getTranslate(lang) {
  const langTextChange = document.querySelectorAll('[data-i18]');
  return langTextChange.forEach((index) => {
    if (index.placeholder) {
      index.placeholder = i18Obj[lang][index.dataset.i18];
      index.textContent = '';
    } else {
      index.textContent = i18Obj[lang][index.dataset.i18];
    }
  });
}

//Подсветка активной кнопки перевода

function changeTranslateColor(event) {
  const langSelect = document.querySelectorAll('.lang-select');

  langSelect.forEach((index) => {
    index.classList.remove('active');
  });
  if (event.target.classList.contains('lang-select')) {
    event.target.classList.add('active');
    if (event.target.classList.contains('en')) {
      lang = 'en';
      getTranslate(lang);
    } else {
      lang = 'ru';
      getTranslate(lang);
    }
  }
}
langChange.addEventListener('click', changeTranslateColor);

//-------------------------------------------------------------------------

//Смена кнопки выбора темы
var checkBox = document.getElementById('theme-select');

const changeThemesList = [
  '.themes',
  'body',
  '#skills',
  '#portfolio',
  '#price',
  '#video',
  '#footer',
  '#contacts',
  'h2',
  '.portfolio-btn',
  '#menu-nav',
  '.nav-item',
  '.line1',
  '.line3',
];

var theme = window.localStorage.getItem('data-theme');
if (theme) document.documentElement.setAttribute('data-theme', theme);
//checkBox.checked = theme == 'dark' ? true : false;
if (theme == 'dark') {
  checkBox.checked = true;
  ThemesChangeRemove();
} else {
  checkBox.checked = false;
  ThemesChangeAdd();
}

checkBox.addEventListener('change', function () {
  if (this.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    window.localStorage.setItem('data-theme', 'dark');
    ThemesChangeRemove();
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    window.localStorage.setItem('data-theme', 'light');

    ThemesChangeAdd();
  }
});

//const ThemesChange = document.querySelector('.theme');
function ThemesChangeAdd() {
  return changeThemesList.forEach((index) => {
    let selectSome = document.querySelectorAll(index);
    selectSome.forEach((index) => {
      index.classList.add('light-theme');
    });
  });
}
function ThemesChangeRemove() {
  return changeThemesList.forEach((index) => {
    let selectSome = document.querySelectorAll(index);
    selectSome.forEach((index) => {
      index.classList.remove('light-theme');
    });
  });
}

//-------------------------------------------------------------------------

// Дополнительный функционал: данные хранятся в local storage

function setLocalStorage() {
  localStorage.setItem('lang', lang);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslate(lang);
  }
}
window.addEventListener('load', getLocalStorage);

//----------------------------------------------------------------

/* Кнопка с эффектом Ripple Button */

const portfolioBtn = document.querySelectorAll('.portfolio-btn');

portfolioBtn.forEach((index) => {
  index.addEventListener('click', function (event) {
    const x = event.clientX;
    const y = event.clientY;

    /*console.log(x + ' - это x; ' + y + ' - это y ');*/

    const buttonTop = event.target.offsetTop;
    const buttonLeft = event.target.offsetLeft;
    /*console.log(
      buttonLeft + ' - это buttonLeft ' + buttonTop + ' - это buttonTop; '
    );*/

    let box = index.getBoundingClientRect();
    //console.log(box);
    const xInside = x - buttonLeft;
    const yInside = y - box.top;
    /*console.log(xInside + ' - это xInside; ' + yInside + ' - это yInside ');*/

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    this.appendChild(circle);

    setTimeout(() => circle.remove(), 500);
  });
});

//----------------------------------------------------------------

console.log(`По итогу 3 части задания Всего: 83 балла\n
    Частично выполненные пункты:\n
    1) выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы — 3 балл(а)\n`);

console.log(`По итогу 2 части задания Всего: 81 баллов\n
    1. Вёрстка соответствует макету. Ширина экрана 768px +48 - итого 48\n
    2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15 - итого 15\n
    3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22 - итого 18\n`);
