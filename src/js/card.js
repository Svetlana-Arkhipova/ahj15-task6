export default class newCard {
    constructor(element) {
        if (typeof element === 'string') {
            // eslint-disable-next-line no-param-reassign
            element = document.querySelector(element);
          }
        this.element = element;
        this.addForm = "<div class='add-form-wrap'><form class='add-form'><textarea class='add-form-text' placeholder='Enter a title for this card'></textarea><button class='add-form-btn-submit'>Add Card</button><button class='add-form-btn-cancel'>&times;</button></form></div>";
        this.addCard = this.addCard.bind(this);
        this.submitCard = this.submitCard.bind(this);

        this.element.addEventListener('click', this.addCard);  
    }

    addCard(e) {
        e.preventDefault();
        const { target } = e;
        target.previousElementSibling.insertAdjacentHTML('afterend', this.addForm);
        const btnSubmit = target.closest('.board-column').querySelector('.add-form-btn-submit');
        const btnCancel = target.closest('.board-column').querySelector('.add-form-btn-cancel');
        target.style.display = 'none';
        btnSubmit.addEventListener('click', this.submitCard);
        btnCancel.addEventListener('click', this.cancelCard);
    }

    submitCard(e) {
        e.preventDefault();
        const { target } = e;
        const textField = target.previousSibling;
        const list = target.closest('.board-column').querySelector('.column-list');
        const item = document.createElement('li');   
        item.className = 'column-list-item';
        item.innerHTML = textField.value + "<span class='delete-item'></span>";
        list.insertAdjacentElement('beforeend', item);
        textField.value = '';
    }

    cancelCard(e) {
        e.preventDefault();
        const { target } = e;
        const wrap = target.closest('.add-form-wrap');
        wrap.style.display = 'none';
        wrap.nextElementSibling.removeAttribute('style');
    }
}