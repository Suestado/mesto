import {
  openedPopupClass,
  generalPopupClass,
  popupCloseBtnClass
} from '../utils/constants.js';

export class Popup {
  constructor(popupSelector) {
    this._currentPopup = document.querySelector(popupSelector);
  }

  //Содержит публичные методы open и close, которые отвечают за открытие и закрытие попапа.
  open() {
    this._currentPopup.classList.add(openedPopupClass);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._currentPopup.classList.remove(openedPopupClass);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //Содержит публичный метод setEventListeners,
  // который добавляет слушатель клика иконке закрытия попапа.
  // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  setEventListeners() {
    this._currentPopup.addEventListener('click', (evt) => {
      const popupClassesList = evt.target.classList;
      if(popupClassesList.contains(popupCloseBtnClass) || popupClassesList.contains(generalPopupClass)) {
        this.close();
      }
    });
  }

  //Содержит приватный метод _handleEscClose, который содержит логику закрытия попапа клавишей Esc.
  _handleEscClose = (evt) => {
    if(evt.key === 'Escape') {
      this.close();
    }
  }
}
