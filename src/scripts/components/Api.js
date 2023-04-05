export class Api {
  constructor(serverLink) {
    this._mainServer = serverLink;
    this._cardsDataPostfix = '/cards';
    this._userInfoPostfix = '/users/me';
    this._userAvatarPostfix = '/users/me/avatar';

    this._authorization = function (method, postfix, body) {
      return fetch(this._mainServer + postfix, {
        method: method,
        headers: {
          'authorization': '9d6e9065-bec5-40dc-8c9b-a22a23e762e4',
          'Content-Type': 'application/json',
        },
        body: body,
      });
    };

    this._errorCatch = () => {
      return (res => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      });
    };
  }

  getInitialCards() {
    return this._authorization(
        'GET',
        this._cardsDataPostfix)
      .then(this._errorCatch());
  }

  getUserInfo() {
    return this._authorization(
        'GET',
        this._userInfoPostfix)
      .then(this._errorCatch());
  }

  setUserInfo({ name, about }) {
    return this._authorization(
        'PATCH',
        this._userInfoPostfix,
        JSON.stringify({
          name: name,
          about: about,
        }),
      )
      .then(this._errorCatch());
  }

  setUserAvatar({ avatar }) {
    return this._authorization(
        'PATCH',
        this._userAvatarPostfix,
        JSON.stringify({
          avatar: avatar,
        }),
      )
      .then(this._errorCatch());
  }

  uploadUserCard({ name, link }) {
    return this._authorization(
        'POST',
        this._cardsDataPostfix,
        JSON.stringify({
          name: name,
          link: link,
        }),
      )
      .then(this._errorCatch());
  }

  uploadLikeStatus(like, cardID) {
    if(like) {
      return this._authorization(
          'DELETE',
          this._cardsDataPostfix + '/' + cardID + '/likes',
        )
        .then(this._errorCatch());
    } else {
      return this._authorization(
          'PUT',
          this._cardsDataPostfix + '/' + cardID + '/likes',
        )
        .then(this._errorCatch());
    }
  }

  removeCard(cardID) {
    return this._authorization(
        'DELETE',
        this._cardsDataPostfix + `/${cardID}`,
      )
      .then(this._errorCatch());
  }
}
