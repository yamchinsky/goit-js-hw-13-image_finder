export default class ApiService {
  constructor({ perPage, page = 1 }) {
    this.requestUrl = 'https://pixabay.com/api/';
    this.perPage = perPage;
    this.page = page;
    this.key = '21696545-9a06c1dceb645ff071558b926';
    this.userQuery = '';
  }

  fetchPics() {
    const url = `${this.requestUrl}?image_type=photo&orientation=horizontal&q=${this.userQuery}&page=${this.page}&per_page=${this.perPage}&key=${this.key}`;

    return fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject('Something went wrong');
      })
      .then(data => {
        this.incrementPage();
        return data.hits;
      });
  }
  set query(newQuery) {
    this.userQuery = newQuery;
  }
  get query() {
    return this.userQuery;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }
}
