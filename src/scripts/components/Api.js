export class Api {
  constructor({ baseURL, headers }) {
    this._cardsDataPostfix = '/cards';
    this._userInfoPostfix = '/users/me';
    this._userAvatarPostfix = '/users/me/avatar';

    this._request = function (method, postfix, body) {
      return fetch(baseURL + postfix, {
        method: method,
        headers: headers,
        body: body,
      })
        .then(this._checkResponse);
    };

    this._checkResponse = (res) => {
        if(res.ok) {
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
    };
  }

  getInitialCards() {
    return this._request(
        'GET',
        this._cardsDataPostfix)
  }

  getUserInfo() {
    return this._request(
        'GET',
        this._userInfoPostfix)
  }

  setUserInfo({ name, about }) {
    return this._request(
        'PATCH',
        this._userInfoPostfix,
        JSON.stringify({
          name: name,
          about: about,
        }),
      )
  }

  setUserAvatar({ avatar }) {
    return this._request(
        'PATCH',
        this._userAvatarPostfix,
        JSON.stringify({
          avatar: avatar,
        }),
      )
  }

  uploadUserCard({ name, link }) {
    return this._request(
        'POST',
        this._cardsDataPostfix,
        JSON.stringify({
          name: name,
          link: link,
        }),
      )
  }

  uploadLikeStatus(like, cardID) {
    if(like) {
      return this._request(
          'DELETE',
          this._cardsDataPostfix + '/' + cardID + '/likes',
        )
    } else {
      return this._request(
          'PUT',
          this._cardsDataPostfix + '/' + cardID + '/likes',
        )
    }
  }

  removeCard(cardID) {
    return this._request(
        'DELETE',
        this._cardsDataPostfix + `/${cardID}`,
      )
  }
}
