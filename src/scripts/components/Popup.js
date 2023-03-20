import {
  openedPopupClass,
  generalPopupClass,
  popupCloseBtnClass,
} from '../utils/constants.js';

export class Popup {
  constructor(popupSelector) {
    this._currentPopup = document.querySelector(popupSelector);
  }

  open() {
    this._currentPopup.classList.add(openedPopupClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._currentPopup.classList.remove(openedPopupClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }


  // добавляет слушатель клика иконке закрытия попапа.
  // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._currentPopup.addEventListener('click', (evt) => {
      const popupClassesList = evt.target.classList;
      if(popupClassesList.contains(popupCloseBtnClass) || popupClassesList.contains(generalPopupClass)) {
        this.close();
      }
    });
  }

  //закрытие попапа клавишей Esc.
  _handleEscClose = (evt) => {
    if(evt.key === 'Escape') {
      this.close();
    }
  };
}
