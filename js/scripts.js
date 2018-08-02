var topButton = document.getElementById("top");
var scrolled;
var timer;

//var form = document.querySelector(".message__form");
//var btn = form.querySelector(".message__btn");
//var patternName = '/^[a-zA-Zа-яёА-ЯЁ\s\-]+$/';
//var patternMail	= /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/i;
//
//var popup = document.querySelector(".modal-message");
//var close = popup.querySelector(".modal-close");

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

////  скрипт валидации формы
//btn.addEventListener('click', validateForm);
//
//function validateForm(evt) {
//  evt.preventDefault();
//  var userName = form.querySelector("[name=username]");
//  var userEmail = form.querySelector("[name=usermail]");
//  
//  console.log(userName.value);
//  console.log(userEmail.value);
//  
//
//  if(!userName.value || patternName.test(userEmail.value) == false) {
//    userName.classList.add("message__field--error");
//    return false;
//  }
//  
//  if(!userEmail.value || patternMail.test(userEmail.value) == false) {
//    userEmail.classList.add("message__field--error");
//    return false;
//  }
//  
//  return true;
//}




