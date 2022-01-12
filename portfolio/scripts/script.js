// Добавила плавность для якорей
const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute('href').substr(1);

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
