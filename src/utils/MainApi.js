import { BASE_URL } from "./constants";

class MainApi {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _checkResponse (response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Error: ${response.status}: ${response.statusText}`)
    );
  };

  async _request (url, options) {
    const response = await fetch(url, options);
    return this._checkResponse(response);
  };

  async editUser (user, token) {
    const response = await this._request(`${this._baseUrl}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: `${user.name}`,
        email: `${user.email}`,
      }),
    });
    return response;
  };

  async getSavedCards (token) {
    const response = await this._request(`${this._baseUrl}/movies`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    });
    return response;
  };

  saveCard (card, token) {
    return this._request(`${this._baseUrl}/movies`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: card.image,
        trailerLink: card.trailerLink,
        thumbnail: card.thumbnail,
        movieId: card.movieId,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      }),
    });
  };

  deleteCard (id, token) {
    return this._request(`${this._baseUrl}/movies/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    });
  }
};

export const mainApi = new MainApi({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
