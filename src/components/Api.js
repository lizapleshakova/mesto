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

// удалить карточку
removeCard(_id) {
  return fetch(`${this._baseUrl}/cards/${_id}`, {
    method: "DELETE",
    headers: this._headers,
  })
  .then(this._handleResponse);
}

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
  setProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    })
      .then(this._handleResponse);
  }

  // передача аватарки
  setAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: data.avatar })
    })
      .then(this._handleResponse);
  }

  // передача карточки на сервер
  setCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    })
      .then(this._handleResponse);
  }

  // Поставить лайк
  addLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._handleResponse);
  }
// Удалить лайк
removeLike(_id) {
  return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
    method: "DELETE",
    headers: this._headers,
  })
  .then(this._handleResponse);
}
}
