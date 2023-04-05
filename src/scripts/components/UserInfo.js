export class Userinfo {
  constructor({ userNameSelector, userDescriptionSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatar = document.querySelector(userAvatarSelector)
    this._ownUserID = null;
  }

  // возвращает объект с данными пользователя.
  getUserInfo() {
    this._currentUserInfo = {};
    this._currentUserInfo['name'] = this._userName.textContent;
    this._currentUserInfo['about'] = this._userDescription.textContent;
    return this._currentUserInfo;
  }

  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(userData) {
    this._userName.textContent = userData['name'];
    this._userDescription.textContent = userData['about'];
    this._ownUserID = userData._id;
  }

  setUserAvatar(userData) {
    this._userAvatar.src = userData['avatar'];
  }

  getOwnUserID() {
    return this._ownUserID;
  }
}
