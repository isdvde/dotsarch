import { $create } from '../lib/utils';

export class XTodoList extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = ''; 

    this.$item_template = `
      <p class="todo__item__p"></p>
      <button class="btn btn-red btn-small"> X </button>
    `

    this.classList.add('todo__content');
    this.todo = [];
  }

  create_item() {
    let $div = $create('div');
    $div.classList.add('todo__item');
    $div.innerHTML = this.$item_template;
    console.log($div);
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