//Класс UserInfo отвечает за управление отображением информации о пользователе на странице. Этот класс:
export class Userinfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
  }

  //Содержит публичный метод getUserInfo, который возвращает объект с данными пользователя.
  // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии.
  getUserInfo() {
    this._currentUserInfo = {};
    this._currentUserInfo['profile__name'] = this._userName.textContent;
    this._currentUserInfo['profile__description'] = this._userDescription.textContent;
    return this._currentUserInfo;
  }

  //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo(userDataObj) {
    this._userName.textContent = userDataObj['profile__name'];
    this._userDescription.textContent = userDataObj['profile__description'];
  }
}
