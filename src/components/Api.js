export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _sendRequest(url, options) {
    return fetch(url, options)
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  loadUserInfo() {
    return this._sendRequest(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  patchUserInfo({ name, about, avatar, _id }) {
    return this._sendRequest(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
        avatar: avatar,
        _id: _id
      })
    })
  }

  getInitialCards() {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
  }

  addCard({ name, link }) {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  likeCard(cardId) {
    return this._sendRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  removeLikeCard(cardId) {
    return this._sendRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  deleteCard(cardId) {
    return this._sendRequest(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  patchAvatar(data) {
    return this._sendRequest(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }
}

