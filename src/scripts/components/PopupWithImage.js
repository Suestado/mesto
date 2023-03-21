import { Popup } from './Popup.js';
import {
  popupPicSelector,
  popupFigcaptionSelector,
} from '../utils/constants.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPic = this._currentPopup.querySelector(popupPicSelector);
    this._popupFigcaption = this._currentPopup.querySelector(popupFigcaptionSelector);
  }

  open(evt) {
    super.open();
    this._popupPic.src = evt.target.src;
    this._popupPic.alt = evt.target.alt;
    this._popupFigcaption.textContent = evt.target.alt;
  }
}
