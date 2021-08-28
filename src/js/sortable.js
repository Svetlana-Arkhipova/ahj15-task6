/* eslint-disable class-methods-use-this */
export default class Sortable {
  constructor(element) {
    if (typeof element === 'string') {
      // eslint-disable-next-line no-param-reassign
      element = document.querySelector(element);
    }

    this.onStartDrag = this.onStartDrag.bind(this);
    this.onDragDrop = this.onDragDrop.bind(this);
    this.onDrag = this.onDrag.bind(this);

    this.element = element;
    this.items = [...this.element.closest('.board').querySelectorAll('li')];

    this.element.addEventListener('mousedown', this.onStartDrag);
    document.documentElement.addEventListener('mouseup', this.onDragDrop);
  }

  onStartDrag(e) {
    e.preventDefault();
    const { target } = e;
    this.shiftX = e.clientX - target.getBoundingClientRect().left;
    this.shiftY = e.clientY - target.getBoundingClientRect().top;
    this.itemWidth = getComputedStyle(target).width;
    this.itemHeight = getComputedStyle(target).height;

    target.classList.add('sortable__dragged');
    target.style.width = this.itemWidth;
    this.currentItem = target;

    document.documentElement.addEventListener('mousemove', this.onDrag);

    this.onDrag(e);
  }

  onDragDrop(e) {
    document.documentElement.removeEventListener('mousemove', this.onDrag);

    const target = document.elementFromPoint(e.clientX, e.clientY);
    let listItem = this.items.find((item) => item === target);
    const column = target.closest('.board-column').querySelector('.column-list');

    if (!listItem) {
      column.appendChild(this.currentItem);
    } else {
      const { top, bottom } = listItem.getBoundingClientRect();
      const toBottom = bottom - e.clientY;
      const toTop = e.clientY - top;
      if (toTop > toBottom) {
        listItem = listItem.nextElementSibling;
        if (listItem === this.currentItem) listItem = listItem.nextElementSibling;
      }
      column.insertBefore(this.currentItem, listItem);
    }
    this.currentItem.style.left = '';
    this.currentItem.style.top = '';
    this.currentItem.classList.remove('sortable__dragged');
    this.currentItem = undefined;
  }

  onDrag(e) {
    this.currentItem.style.left = `${e.clientX - this.shiftX}px`;
    this.currentItem.style.top = `${e.clientY - this.shiftY}px`;
  }
}
