function showInputError(singleFormElement, inputElement, errorMessage, selectors) {
  const errorElement = singleFormElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputElementErrorClass);
  errorElement.classList.add(selectors.errorMessageActiveClass);
  errorElement.textContent = errorMessage;
}

function hideInputError(singleFormElement, inputElement, selectors) {
  const errorElement = singleFormElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputElementErrorClass);
  errorElement.classList.remove(selectors.errorMessageActiveClass);
  errorElement.textContent = '';
}

function checkInputValidity(singleFormElement, inputElement, selectors) {
  if(!inputElement.validity.valid) {
    showInputError(singleFormElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(singleFormElement, inputElement, selectors);
  }
}

function setEventListener(singleFormElement, selectors) {
  const inputList = Array.from(singleFormElement.querySelectorAll(selectors.formInputSelector));
  const buttonSubmit = singleFormElement.querySelector(selectors.formSubmitButtonSelector);
  toggleButtonState(inputList, buttonSubmit, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(singleFormElement, inputElement, selectors);
      toggleButtonState(inputList, buttonSubmit, selectors);
    });
  });

  //деактивация кнопки при ресете формы и удаление сообщений об ошибках заполнения формы
  singleFormElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonSubmit, selectors);

      inputList.forEach((inputElement) => {
        hideInputError(singleFormElement, inputElement, selectors);
      });
    }, 0);
  });
}


function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((singleFormElement) => {
    singleFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListener(singleFormElement, selectors);
  });
}


enableValidation({
  formSelector: '.popup__form',
  formInputSelector: '.popup__input',
  formSubmitButtonSelector: '.popup__submit',
  inputElementErrorClass: 'popup__input_type_error',
  errorMessageActiveClass: 'popup__input-error_active',
  submitButtonDisabledClass: 'popup__submit_type_disabled',
});


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonSubmit, selectors) {
  if(hasInvalidInput(inputList)) {
    buttonSubmit.setAttribute('disabled', 'disabled');
    buttonSubmit.classList.add(selectors.submitButtonDisabledClass);
  } else {
    buttonSubmit.removeAttribute('disabled');
    buttonSubmit.classList.remove(selectors.submitButtonDisabledClass);
  }
}
