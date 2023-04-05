export class Card {
  constructor({ cardDataObj, cardSelectorsObj, openPhotoCallback, deletePhotoCallback, likePhotoCallback, ownUserID }) {
    this._cardDataObj = cardDataObj;
    this._cardSelectorsObj = cardSelectorsObj;
    this._openPhotoCallback = openPhotoCallback;
    this._deletePhotoCallback = deletePhotoCallback;
    this._likePhotoCallback = likePhotoCallback;
    this.cardID = cardDataObj._id;
    this._ownUserID = ownUserID;
    this._newPhotoCard = this._getTemplate();
    this._likesCounter = this._newPhotoCard.querySelector(this._cardSelectorsObj.likesCounterSelector);
    this._likeSign = this._newPhotoCard.querySelector(this._cardSelectorsObj.photoCardLikeSelector);
    this._trashBtn = this._newPhotoCard.querySelector(this._cardSelectorsObj.photoCardTrashSelector);
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

  _setEventListeners() {
    //слушатель на лайки
    this._likeSign
      .addEventListener('click', (evt) => {
        this._toggleLike(evt.target, this._cardSelectorsObj.photoLikeIsActive);
        this._likeCard();
      });

    //слушатель на удаление карточки
    this._trashBtn
      .addEventListener('click', () => {
        this._deletePhotoCallback(this);
      });

    //слушатель на открытие фото в полноэкранном режиме
    this._cardImage.addEventListener('click', this._openPhotoCallback);
  }

  _cardIsLiked() {
    let isLiked = false;
    for (let like of this._cardDataObj.likes) {
      if(like._id === this._ownUserID) {
        isLiked = true;
      }
    }
    return isLiked;
  }

  _likeCard() {
    this._likePhotoCallback(this._cardIsLiked(), this.cardID);
  }
  
  removeCardFromPage() {
    this._newPhotoCard.remove();
  }

  setNewCardData(data) {
    this._cardDataObj = data;
    this._likesCounter.textContent = this._cardDataObj.likes.length;
  }

  renderPhotoCard() {
    if(this._cardDataObj.owner._id !== this._ownUserID) {
      this._trashBtn.style.display = 'none';
    }

    if(this._cardIsLiked()) {
      this._likeSign.classList.add(this._cardSelectorsObj.photoLikeIsActive);
    }

    this._cardImage = this._newPhotoCard.querySelector(this._cardSelectorsObj.photoCardImageSelector);
    this._setEventListeners();

    this._newPhotoCard.querySelector(this._cardSelectorsObj.photoCardNameSelector).textContent = this._cardDataObj.name;
    this._cardImage.src = this._cardDataObj.link;
    this._cardImage.alt = this._cardDataObj.name;
    this._cardImage.id = this._cardDataObj._id;
    this._likesCounter.textContent = this._cardDataObj.likes.length;

    return this._newPhotoCard;
  }
}
