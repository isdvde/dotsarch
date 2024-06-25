import { $create } from '../lib/utils';

export class XTodoList extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class="todo__item">
        <p class="todo__item__p"></p>
        <button class="btn btn-red btn-small"> X </button>
      </div>
    `;

    this.classList.add('todo__content');
    this.$p = this.querySelector('p');
    this.$button = thi.querySelector('button');

    this.todo = [];
  }

  create_item() {
    let $div = this.create_div();
    $div.appendChild(this.create_checkbox());
    $div.appendChild(this.create_p());
    $div.appendChild(this.create_button());
    return $div;
  }

  create_checkbox() {
    let $checkbox = $create("input");
    $checkbox.setAttribute("type", "checkbox");
    return $checkbox;
  }

  create_p() {
    let $p = $create('p');
    $p.textContent = this.value || '';
    return $p;
  }

  create_button() {
    let $button = $create('button');
    $button.textContent = 'Eliminar';
    return $button;
  }

  create_div() {
    return $create('div');
  }

  add_item(value) {
    this.value = value;
    this.append(this.create_item());
  }

  render() {
    if (!this.todo) return;
  }

  connectedCallback() {
    this.$list = this.querySelector(".todo-list");
    // this.create_checkbox();
  }
}

customElements.define('x-todo-list', XTodoList);