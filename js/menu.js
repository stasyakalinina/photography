'use strict';

(function () {
  const iconMenu = document.querySelector('.menu-icon');
  const mainMenu = document.querySelector('#navmenu');

  function showMobileMenu(evt) {
    evt.preventDefault();
    mainMenu.classList.toggle("main-nav__menu");
    mainMenu.classList.toggle("submenu");
  };

  iconMenu.addEventListener("click", showMobileMenu);
})();
