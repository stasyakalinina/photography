'use strict';

(function () {
  const URL = 'https://echo.htmlacademy.ru';
  const requestTimeout = 10000;
  const okCode = 200;
  const main = document.querySelector('main');
  const errorAd = document.querySelector('#error').content.querySelector('.modal-message').cloneNode(true);
  const errorCloseBtn = errorAd.querySelector('.modal-message__close');

  // обрабатываем ошибки
  let getErrorMessage = (status) => {
    let errorMessage;
    switch (status) {
      case 400:
        errorMessage = 'Неверный запрос';
        break;
      case 401:
        errorMessage = 'Пользователь не авторизован';
        break;
      case 404:
        errorMessage = 'Данные не найдены';
        break;
      default:
        errorMessage = `Ошибка доступа: ${status}`;
    }
    return errorMessage;
  };

  let onError = (message) => {
    main.appendChild(errorAd);
    errorAd.querySelector('.error__message').textContent = getErrorMessage();

    errorCloseBtn.addEventListener('click', () => {
      main.removeChild(errorAd);
    });
  };

  let sendRequest = (onSuccess, data) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      if (xhr.status === okCode) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status);
      }
    });
    xhr.addEventListener('error', () => {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', () => {
      onError(`Запрос не успел выполниться за ${requestTimeout} мс`);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.load = {
    save: (onSuccess, data) => {
      sendRequest(onSuccess, data);
    }
  };
})();
