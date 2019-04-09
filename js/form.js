'use strict';

(function () {
  const form = document.querySelector('.message__form');
  const	fields = form.querySelectorAll('.message__field:not(textarea)');
  const btn = form.querySelector('.message__btn');
  const popup = document.querySelector('.modal-message');
  const close = popup.querySelector('.modal-message__close');

  function setInvalidBorder() {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].validity.valid) {
        fields[i].style.boxShadow = 'none';
      } else {
        fields[i].style.boxShadow = '0 0 2px 2px #ff6547';
      }
    }
  };

  function addInvalidListener() {
    for (let i = 0; i < fields.length; i++) {
      fields[i].addEventListener('invalid', setInvalidBorder);
      fields[i].addEventListener('input', setInvalidBorder);
    }
  };

  fields.forEach(function (item) {
    addInvalidListener(item);
  });

  function closeSuccessMessage(evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    form.reset();
  };

  let showSuccessMessage = () => {
    popup.classList.add("modal-show");
    close.addEventListener("click", closeSuccessMessage);
  };

  btn.addEventListener('click', (evt) => {
    if (form.checkValidity()) {
      evt.preventDefault();
      let data = new FormData(form);
      window.load.save(showSuccessMessage, data);
    }
  });
})();
