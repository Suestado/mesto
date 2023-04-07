export class Userinfo {
  constructor({ userNameSelector, userDescriptionSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userDescription = document.querySelector(userDescriptionSelector);
    this._userAvatar = document.querySelector(userAvatarSelector)
    this._ownUserID = null;
  }

  getUserInfo() {
    this._currentUserInfo = {};
    this._currentUserInfo['name'] = this._userName.textContent;
    this._currentUserInfo['about'] = this._userDescription.textContent;
    return this._currentUserInfo;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._userName.textContent = name;
    this._userDescription.textContent = about;
    this._ownUserID = _id;
    this._userAvatar.src = avatar;
  }


  getOwnUserID() {
    return this._ownUserID;
  }
}
