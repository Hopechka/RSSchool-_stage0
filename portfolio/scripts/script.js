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

/*const hamburger = document.querySelector('#menu__toggle');

function toggleMenu() {
  if (hamburger.classList.contains('open')) {
    hamburger.classList.remove('open');
  } else hamburger.classList.toggle('open');
}
hamburger.addEventListener('click', toggleMenu);
const navMenu = document.querySelector('#menu-nav');
// function togglNavMenu() {
//   navMenu.classList.toggle("close");
// }
// navMenu.addEventListener("click", togglNavMenu);

// function togglNavMenuOpen() {
//   navMenu.classList.remove("close");
// }
// navMenu.addEventListener("click", togglNavMenuOpen);
function closeMenu() {
  if (navMenu.classList.contains('close')) {
    navMenu.classList.remove('close');
  } else navMenu.classList.toggle('close');
}
navMenu.addEventListener('click', closeMenu);*/

const hamburger = document.querySelector('#menu__toggle');
const navMenu = document.querySelector('#menu-nav');

function toggleMenu() {
  hamburger.classList.add('open');
}
hamburger.addEventListener('click', toggleMenu);

function toggleMenuClose() {
  hamburger.classList.remove('open');
  //toggleNavMenuOpen();
}

function toggleNavMenuOpen() {
  navMenu.classList.remove('close');
}

function toggleNavMenu() {
  navMenu.classList.add('close');
  toggleMenuClose();
  toggleNavMenuOpen();
}
navMenu.addEventListener('click', toggleNavMenu);
