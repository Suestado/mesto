import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, popupFormSelectors }) {
    super(popupSelector);
    this._popupFormSelectors = popupFormSelectors;
    this._form = this._currentPopup.querySelector(this._popupFormSelectors.formSelector);
  }

  setSubmitHandler(submitHandler) {
    this._formSubmitCallback = submitHandler;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallback();
    });
    super.setEventListeners();
  }
}
