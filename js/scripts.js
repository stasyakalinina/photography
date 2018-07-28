//document.getElementById('top').onclick = function () {
//  
//}
var topButton = document.getElementById('top');
var scrolled;
var timer;

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
} 