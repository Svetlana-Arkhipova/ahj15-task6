import Sortable from './sortable';

import newCard from './card';

const lists = [...document.querySelectorAll('.column-list')];
lists.forEach((item) => {
    const sortable = new Sortable(item);
});

const btns = [...document.querySelectorAll('.column-add-btn')];
btns.forEach((item) => {
    const card = new newCard(item);
});