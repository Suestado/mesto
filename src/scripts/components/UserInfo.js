export class Userinfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
  }

  // возвращает объект с данными пользователя.
  getUserInfo() {
    this._currentUserInfo = {};
    this._currentUserInfo['profile__name'] = this._userName.textContent;
    this._currentUserInfo['profile__description'] = this._userDescription.textContent;
    return this._currentUserInfo;
  }

  //принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(userDataObj) {
    this._userName.textContent = userDataObj['profile__name'];
    this._userDescription.textContent = userDataObj['profile__description'];
  }
}
