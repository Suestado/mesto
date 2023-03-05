export class Card {
  constructor(cardDataObj, cardSelectorsObj, openPopupImg) {
    this._cardDataObj = cardDataObj;
    this._cardSelectorsObj = cardSelectorsObj;
    this._openPopupImg = openPopupImg;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelectorsObj.photoCardTemplateSelector)
      .content
      .querySelector(this._cardSelectorsObj.photoCardElementSelector)
      .cloneNode(true);
  }

  _toggleLike(container, className) {
    container.classList.toggle(className);
  }

  _removePhotoCard(evt) {
    evt.target.closest(this._cardSelectorsObj.photoCardElementSelector).remove();
  }

  _setEventListeners() {
    //слушатель на лайки
    this._newPhotoCard
      .querySelector(this._cardSelectorsObj.photoCardLikeSelector)
      .addEventListener('click', (evt) => {
      this._toggleLike(evt.target, this._cardSelectorsObj.photoLikeIsActive);
    });

    //слушатель на удаление карточки
    this._newPhotoCard
      .querySelector(this._cardSelectorsObj.photoCardTrashSelector)
      .addEventListener('click', (evt) => {
        this._removePhotoCard(evt)
      });

    //слушатель на открытие фото в полноэкранном режиме
    this._newPhotoCard
      .querySelector(this._cardSelectorsObj.photoCardImageSelector)
      .addEventListener('click', this._openPopupImg);
  }


  renderPhotoCard() {
    this._newPhotoCard = this._getTemplate();
    this._setEventListeners();

    this._newPhotoCard.querySelector(this._cardSelectorsObj.photoCardNameSelector).textContent = this._cardDataObj.name;
    this._newPhotoCard.querySelector(this._cardSelectorsObj.photoCardImageSelector).src = this._cardDataObj.link;
    this._newPhotoCard.querySelector(this._cardSelectorsObj.photoCardImageSelector).alt = this._cardDataObj.name;

    return this._newPhotoCard;
  }
}
