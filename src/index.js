import './saas/main.scss';

import ApiServise from './js/apiService.js';
import createMarkup from '../templates/gallery.hbs';
import LoadMoreBtn from './js/loadmoreBtn.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, alert } from '@pnotify/core';

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const perPage = 12;

const apiServise = new ApiServise({ perPage });

const nodes = {
  searchBtnNode: document.querySelector('.search-form'),
  inputNode: document.querySelector('input'),
  ulNode: document.querySelector('.gallery'),
};

nodes.searchBtnNode.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', getPics);

function onSearch(event) {
  event.preventDefault();
  const value = event.currentTarget.elements.query.value;
  console.log(value);
  if (value === '') return alert('Shit happens');
  loadMoreBtn.show();
  apiServise.resetPage();
  nodes.ulNode.innerHTML = '';
  getPics();
}

function getPics() {
  loadMoreBtn.disable();
  apiServise
    .fetchPics()
    .then(data => {
      console.log(data);
      if (data.length === 0) return error('Try again, move it');
      renderPics(data);
      loadMoreBtn.enable();
      windowScrollTo();
    })
    .catch(err => {
      renderError(err);
      loadMoreBtn.hide();
    });
}

function renderPics(data) {
  const markup = createMarkup(data);
  console.log(data);
  nodes.ulNode.insertAdjacentHTML('beforeend', markup);
}
