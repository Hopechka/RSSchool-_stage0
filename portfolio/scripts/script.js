import i18Obj from './translate.js';
console.log(`Всего: 83 баллов\n
    1. Вёрстка соответствует макету. Ширина экрана 768px +48 - итого 48\n
    блок <header> +6 - 6\n
    секция hero +6 - 6\n
    секция skills +6 - 6\n
    секция portfolio +6 - 6\n
    секция video +6 - 6\n
    секция price +6 - 6\n
    секция contacts +6 - 6\n
    блок <footer> +6 - 6\n
    2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15 - итого 15\n
    нет полосы прокрутки при ширине страницы от 1440рх до 768рх +5 - 5\n
    нет полосы прокрутки при ширине страницы от 768рх до 480рх +5 - 5\n
    нет полосы прокрутки при ширине страницы от 480рх до 320рх +5 - 5\n
    3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22 - итого 20\n
    при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2 - 2\n
    при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4 - 4\n
    высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4 - 4\n
    при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4 - 2\n
    бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2 - 2\n
    ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2 - 2\n
    при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4 - 4`);

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

//Перевод страницы на два языка
const langChang = document.querySelector('.lang-link');
function getTranslate(event) {
  const langTextChang = document.querySelectorAll('[data-i18]');
  if (event.target.classList.contains('en')) {
    langTextChang.forEach((index) => {
      if (index.placeholder) {
        index.placeholder = i18Obj.en[index.dataset.i18];
        index.textContent = '';
      } else {
        index.textContent = i18Obj.en[index.dataset.i18];
      }
    });
  }
  if (event.target.classList.contains('ru')) {
    langTextChang.forEach((index) => {
      if (index.placeholder) {
        index.placeholder = i18Obj.ru[index.dataset.i18];
        index.textContent = '';
      } else {
        index.textContent = i18Obj.ru[index.dataset.i18];
      }
    });
  }
}
langChang.addEventListener('click', getTranslate);

//Подсветка активной кнопки перевода

function changeTranslateColor(event) {
  const langSelect = document.querySelectorAll('.lang-select');
  console.log(langSelect);
  langSelect.forEach((index) => {
    index.classList.remove('active');
  });
  if (event.target.classList.contains('lang-select')) {
    event.target.classList.add('active');
  }
}
langChang.addEventListener('click', changeTranslateColor);
