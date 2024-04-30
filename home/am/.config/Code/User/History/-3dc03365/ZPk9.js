export class TodoList extends HTMLElement {

  constructor() {
    super();

    this.innerHTML = `
    <ul class="todo-list">
    </ul>
    `
    this.todo = [];
  }

  create_item() {
    return document.createElement('li');
  }

  add_item(opts) {
    let value = opts.value || '';
    let $item = this.create_item();
    $item.textContent = value;
    this.$list.appendChild($item);
    // this.storage.push(value);
    // console.log(localStorage);
  }

  connectedCallback() {
    this.$list = this.querySelector('.todo-list');

  }

}

customElements.define('x-todo-list', TodoList);