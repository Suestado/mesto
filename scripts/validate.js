function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement) {
  if(!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function setEventListener(fieldset) {
  const inputList = Array.from(fieldset.querySelectorAll('.popup__input'));
  const buttonSubmit = fieldset.querySelector('.popup__submit');
  toggleButtonState(inputList, buttonSubmit);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(fieldset, inputElement);
      toggleButtonState(inputList, buttonSubmit);
    });
  });
}


function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((singleFormElement) => {
    singleFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(singleFormElement.querySelectorAll('.popup__fieldset'));
    fieldsetList.forEach((fieldset) => {
      setEventListener(fieldset);
    });
  });
}

enableValidation();

function hasInvalidInput(inputList) {
return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
})
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
