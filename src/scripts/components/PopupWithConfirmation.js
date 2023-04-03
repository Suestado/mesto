import { Popup } from './Popup.js'

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, formSubmitCallback }, popupFormSelectors) {
    super(popupSelector);
    this._popupFormSelectors = popupFormSelectors;
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._currentPopup.querySelector(this._popupFormSelectors.formSelector);

  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallback();
      this.close();
    });
    super.setEventListeners();
  }
}
