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

// Закрывает гамбургер-меню
const navLinks = document.querySelectorAll('.nav-item');
navLinks.forEach((el) => el.addEventListener('click', closeMenu));
nav.addEventListener('click', closeMenu);
function closeMenu(event) {
  if (event.target.classList.contains('nav-item')) {
    // здесь код, удаляющий класс `'open'` у гамбургер-иконки и у меню
    navLinks.classList.remove('open');
  }
}
