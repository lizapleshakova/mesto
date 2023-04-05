export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // запрос
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };

  // получение информация о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._handleResponse);
  }

  // Получение карточки
  getCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
     })
      .then(this._handleResponse);
  }

  // передача информации о пользователе
  setProfile ({name, about}) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about  })
    })
      .then(this._handleResponse);
  }

// передача аватарки
  setAvatar (avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    })
      .then(this._handleResponse);
  }


}
