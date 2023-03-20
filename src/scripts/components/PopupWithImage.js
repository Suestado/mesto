import { Popup } from './Popup.js';
import {
  popupFullScreenPic,
  popupFullScreenFigcaption
} from '../utils/constants.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

 // Этот класс должен перезаписывать родительский метод open.
  // В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
  open(evt) {
    super.open();
    popupFullScreenPic.src = evt.target.src;
    popupFullScreenPic.alt = evt.target.alt;
    popupFullScreenFigcaption.textContent = evt.target.alt;
  }
}
