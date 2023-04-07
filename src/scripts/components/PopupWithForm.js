import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitCallback }, popupFormSelectors) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._popupFormSelectors = popupFormSelectors;
    this._form = this._currentPopup.querySelector(this._popupFormSelectors.formSelector);
    this._inputList = this._form.querySelectorAll(this._popupFormSelectors.formInputSelector);
    this._submitBtn = this._form.querySelector(this._popupFormSelectors.formSubmitButtonSelector);
    this._submitBtnText = this._submitBtn.textContent;
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
      this.renderLoading(true);
      this._formSubmitCallback(this._getInputValues());
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

  renderLoading(isLoading, loadingText='Сохранение...') {
    if(isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._submitBtnText;
    }
  }
}
