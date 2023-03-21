export class FormValidator {
  constructor(formSelectorsObj, singleFormElement) {
    this._formSelectorsObj = formSelectorsObj;
    this._singleFormElement = singleFormElement;
    this._inputList = Array.from(this._singleFormElement.querySelectorAll(this._formSelectorsObj.formInputSelector));
    this._buttonSubmit = this._singleFormElement.querySelector(this._formSelectorsObj.formSubmitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._singleFormElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._formSelectorsObj.inputElementErrorClass);
    errorElement.classList.add(this._formSelectorsObj.errorMessageActiveClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._singleFormElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._formSelectorsObj.inputElementErrorClass);
    errorElement.classList.remove(this._formSelectorsObj.errorMessageActiveClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonSubmit.setAttribute('disabled', 'disabled');
      this._buttonSubmit.classList.add(this._formSelectorsObj.submitButtonDisabledClass);
    } else {
      this._buttonSubmit.removeAttribute('disabled');
      this._buttonSubmit.classList.remove(this._formSelectorsObj.submitButtonDisabledClass);
    }
  }

  _setEventListener() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    //деактивация кнопки при ресете формы и удаление сообщений об ошибках заполнения формы
    this._singleFormElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
          this._hideInputError(inputElement);
        });
      }, 0);
    });
  }

  enableValidation() {
    this._singleFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListener();
  }
}
