import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitCallback }, popupFormSelectors) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._popupFormSelectors = popupFormSelectors;
    this._form = this._currentPopup.querySelector(this._popupFormSelectors.formSelector);
    this._inputList = this._form.querySelectorAll(this._popupFormSelectors.formInputSelector);
  }

  //метод собирает данные всех полей формы.
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._form.reset();
  }

  prefillData(userData) {
    this._inputList.forEach((input) => {
      input.value = userData[input.name];
    });
  }
}
