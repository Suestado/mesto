export class Api {
  constructor() {
    this._mainServer = 'https://nomoreparties.co/v1/cohort-63';
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
  }

  getInitialCards() {
    return this._authorization(
        'GET',
        this._cardsDataPostfix)
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      });
  }

  getUserInfo() {
    return this._authorization(
        'GET',
        this._userInfoPostfix)
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      });
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
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      });
  }

  setUserAvatar({ avatar }) {
    return this._authorization(
        'PATCH',
        this._userAvatarPostfix,
        JSON.stringify({
          avatar: avatar,
        }),
      )
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      });
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
      .then(res => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      });
  }

  uploadLikeStatus(like, cardID) {
    if(like) {
      return this._authorization(
          'DELETE',
          this._cardsDataPostfix + '/' + cardID + '/likes',
        )
        .then(res => {
          if(res.ok) {
            return res.json();
          } else {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
        });
    } else {
      return this._authorization(
          'PUT',
          this._cardsDataPostfix + '/' + cardID + '/likes',
        )
        .then(res => {
          if(res.ok) {
            return res.json();
          } else {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
        });
    }
  }

}




