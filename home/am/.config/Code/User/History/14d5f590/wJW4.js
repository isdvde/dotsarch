import { $create } from '../lib/utils';

export class XTodoList extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = ''; 

    this.$item_template = `
      <li class="todo__item__li"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></span></li>
      <button class="btn btn-red btn-small"> X </button>
    `;

    this.classList.add('todo__content');
    this.todo = [];
  }

  create_item() {
    let $div = $create('div');
    $div.classList.add('todo__item');
    $div.innerHTML = this.$item_template;
    $div.querySelector('li').textContent = this.value;
    $div.querySelector('button').onclick = function(e) {
      e.target.closest('.todo__item').remove();
    }
    return $div;
  }

  add_item(value) {
    this.value = value;
    this.append(this.create_item());
  }

  render() {
    if (!this.todo) return;
  }
}

customElements.define('x-todo-list', XTodoList);