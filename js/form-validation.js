var form = document.querySelector('.message__form');
var	elements = form.querySelectorAll('.message__field');
var btn = form.querySelector('.message__btn');
var patternName = /^[а-яА-ЯёЁa-zA-Z]+$/;
var patternMail	= /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/i;
var	patternSpam	= /[^\<\>\[\]%\&'`]+$/;
var errorMess = [
  'Незаполненное поле ввода', // [0]
  'Введите ваше реальное имя', // [1]
  'Укажите вашу электронную почту', // [2]
  'Неверный формат электронной почты', // [3]
];
var isError = false;

var popup = document.querySelector('.modal-message');
var close = popup.querySelector(".modal-close");

//  скрипт валидации формы
btn.addEventListener('click', validateForm);

function validateForm(evt) {
  evt.preventDefault();
  var formVal = getFormData(form);
  var error;
  
  for (var property in formVal) {
    error = getError(formVal, property);
    if (error.length != 0) {
      isError = true;
      showError(property, error);
    }
  }
  
  if (!isError) {
    popup.classList.add("modal-show");
  }
}

function getFormData(form) {
  var controls = {};
  for (var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];    
  
    if(element.tagName.toLowerCase() != 'button') {
      controls[element.name] = element.value;
    }
  }
  return controls;
}

function getError(formVal, property) {
  var error = '';
  
  var validate = {
    'username': function() {
      if (formVal.username.length == 0 || patternName.test(formVal.username) == false) {
          error = errorMess[1];
      }
    },
    'usermail': function() {
      if (formVal.usermail.length == 0) {
        error = errorMess[2];  
      } else if (patternMail.test(formVal.usermail) == false) {
        error = errorMess[3];
      }
    }
  };
  validate[property]();  
  return error;
}

function showError(property, error) {
  var formElement = form.querySelector('[name=' + property + ']');
  var errorBox = formElement.nextElementSibling;
  
  formElement.classList.add('message__field--error');
  errorBox.innerHTML = error;
  errorBox.style.display = 'block';
}

form.addEventListener('focus', function() {
  var el = document.activeElement;
  if (el !== btn) cleanError(el);
}, true);

function cleanError(el) {
  var errorBox = el.nextElementSibling;
  el.classList.remove('message__field--error');
  errorBox.style.display = 'none';
}


////  Валидация данных при потере фокуса поля ввода.
//[].forEach.call(elements, function(element) {
//  element.addEventListener('blur', function(evt) {
//    var formElement = e.target;
//    property = formElement.getAttribute('name');
//    dataField = {};
//    dataField[property] = formElement.value;
//    var error = getError(dataField, property);
//    if (error.length != 0) {
//      showError(property, error);
//    }
//    return false;
//  });
//});

//  Закрытие попапа
close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
});
