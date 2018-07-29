var topButton = document.getElementById('top');
var scrolled;
var timer;

var form = document.querySelector('.message__form');
var	elements = form.querySelectorAll('.message__field');
var btn = form.querySelector('.message__btn');
var patternName = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/;
var patternMail	= /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/;
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

//  скрипт кнопки вверх
topButton.addEventListener('click', function (evt) {
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
  jQuery('a[href*=#nav]').click(function () {
    elementClick = jQuery(this).attr("href")
    destination = jQuery(elementClick).offset().top;
    jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 1100);
    return false;
  });
});

//  скрипт валидации формы
btn.addEventListener('click', validForm);

function validForm(evt) {
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
    sendFormData(formVal);
  }
  
  return false;
}

function getFormData(form) {
  var controls = {};
  if (!form.elements) {
    return '';
  }
  for (var i = 0; i < form.elements.length; i++) {
    var element = form.elements[i];
    if (element.tagName.toLowerCase() != 'button') {
		controls[element.name]= element.value;
    }
  }
  return controls;
}

function getError (formVal, property) {
  var error = '',
  
  validate = {
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
  
  validate[property];
  return error;
}

//  Вывод ошибок валидации на экран
function showError (property, error) {
  var formElement = form.querySelector('[name=' + property + ']');
  var errorBox = formElement.nextElementSibling;
  
  formElement.classList.add('message__field--error');
  errorBox.innerHTML = error;
  errorBox.style.display = 'block';
}

//  Удаление текста ошибки при получении фокуса элементом
form.addEventListener('focus', function() {
  var el = document.activeElement;
  if (el !== btn) cleanError(el);
}, true);

function cleanError(el) {
  var errorBox = el.nextElementSibling;
  el.classList.remove('message__field--error');
  errorBox.removeAttribute('style');
}

//  Валидация данных при потере фокуса поля ввода.
[].forEach.call(elements, function(element) {
  element.addEventListener('blur', function(evt) {
    var formElement = e.target;
    property = formElement.getAttribute('name');
    dataField = {};
    dataField[property] = formElement.value;
    var error = getError(dataField, property);
    if (error.length != 0) {
      showError(property, error);
    }
    return false;
  });
});

//  Асинхронная отправка данных формы обратной связи на сервер
function sendFormData(formVal) {
  var xhr = new XMLHttpRequest();
  var body 	= 'username=' + encodeURIComponent(formVal.username) +
    '&usermail=' + encodeURIComponent(formVal.usermail) +
    '&textmessage=' + encodeURIComponent(formVal.textmessage);
  
  xhr.open('POST','/sendmail.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Cache-Control', 'no-cache');
  
  xhr.send(body);
  
  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      popup.classList.add("modal-show"); // при успешной отправке данных появляется попап с сообщением
    }
  };
}

//  Закрытие попапа
close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
});






