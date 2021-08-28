import Sortable from './sortable';

import NewCard from './card';

const lists = [...document.querySelectorAll('.column-list')];
lists.forEach((item) => {
  // eslint-disable-next-line no-unused-vars
  const sortable = new Sortable(item);
});

const btns = [...document.querySelectorAll('.column-add-btn')];
btns.forEach((item) => {
  // eslint-disable-next-line no-unused-vars
  const card = new NewCard(item);
});
