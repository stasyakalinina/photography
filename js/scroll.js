'use strict';

(function () {
  const topButton = document.querySelector('#top');
  const btnAbout = document.querySelector('.arrow--down');
  const aboutSection = document.querySelector('.about');
  let scrolled;
  let timer;

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

  topButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    scrolled = window.pageYOffset;
    scrollToTop();
  });

//

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};


  function scrollTo(to, duration) {
    const element = document.scrollingElement;
    const start = (element && element.scrollTop) || window.pageYOffset,
      change = to - start,
      increment = 20;
    let currentTime = 0;

    const animateScroll = function(){
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      window.scrollTo(0, val);
      if(currentTime < duration) {
        window.setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };

  let scrollToAbout = () => {
    let top = aboutSection.getBoundingClientRect().top;
    scrollTo(top, 1000);
  };

  btnAbout.addEventListener('click', scrollToAbout);

})();
