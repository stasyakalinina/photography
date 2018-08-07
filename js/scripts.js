var topButton = document.getElementById("top");
var scrolled;
var timer;
var iconMenu = document.querySelector(".menu-icon");
var mainMenu = document.getElementById("navmenu");

//мобильное меню
iconMenu.addEventListener("click", function (evt) {
  evt.preventDefault();
  mainMenu.classList.toggle("main-nav__menu");
  mainMenu.classList.toggle("submenu");
});

//  скрипт кнопки вверх
topButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  scrolled = window.pageYOffset;
//    window.scrollTo(0,0);
  scrollToTop();
 });

function scrollToTop() {
  if (scrolled > 0) {
    window.scrollTo(0, scrolled);
    scrolled -= 100;
    timer = setTimeout(scrollToTop, 25);
  } else {
    clearTimeout(timer);
    window.scrollTo(0,0);
  }
};

//  скрипт "плавный скроллинг по якорям"
jQuery(document).ready(function() {
  jQuery("a[href*=#nav]").click(function () {
    elementClick = jQuery(this).attr("href")
    destination = jQuery(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
    return false;
  });
});






