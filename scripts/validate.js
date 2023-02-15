function showInputError(singleFormElement, inputElement, errorMessage) {
  const errorElement = singleFormElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
}

function hideInputError(singleFormElement, inputElement) {
  const errorElement = singleFormElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

function checkInputValidity(singleFormElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(singleFormElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(singleFormElement, inputElement);
  }
}

function setEventListener(singleFormElement, inputList, buttonSubmit) {
  toggleButtonState(inputList, buttonSubmit);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(singleFormElement, inputElement);
      toggleButtonState(inputList, buttonSubmit);
    });
  });

  singleFormElement.addEventListener('reset', () => {
    setTimeout(() => {
      toggleButtonState(inputList, buttonSubmit);
    }, 0);
  });
}


function enableValidation(singleFormElement, inputList, buttonSubmit) {
  singleFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  setEventListener(singleFormElement, inputList, buttonSubmit);
}


function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonSubmit) {
  if(hasInvalidInput(inputList)) {
    buttonSubmit.setAttribute('disabled', 'disabled');
    buttonSubmit.classList.add('popup__submit_type_disabled');
  } else {
    buttonSubmit.removeAttribute('disabled');
    buttonSubmit.classList.remove('popup__submit_type_disabled');
  }
}
