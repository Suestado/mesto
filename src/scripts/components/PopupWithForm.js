import { Popup } from './Popup.js';
import { formValidationSelectors } from '../utils/constants.js';


export class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitCallback }) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._currentPopup.querySelector(formValidationSelectors.formSelector);
    this._inputList = this._form.querySelectorAll(formValidationSelectors.formInputSelector);
  }

  //метод собирает данные всех полей формы.
  _getInputValues() {
    this._inputDataObj = {};
    this._inputList.forEach((input) => {
      this._inputDataObj[input.name] = input.value;
    });
    return this._inputDataObj;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
      this._form.reset();
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
