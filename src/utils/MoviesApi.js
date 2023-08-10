export const mainServerUrl = 'https://api.nomoreparties.co/';

class MoviesApi {
  constructor(options) {
    this._options = options;
    this._headers = this._options.headers;
    this._baseUrl = this._options.baseUrl;
  }

  getFilms () {
    return fetch(`${this._baseUrl}`, { headers: this._headers }).then(
      (response) => this._checkResponse(response)
    );
  }
  _checkResponse (response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Error: ${response.status}: ${response.statusText}`)
    );
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: mainServerUrl + '/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
});
