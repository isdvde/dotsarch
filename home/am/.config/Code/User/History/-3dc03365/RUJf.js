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

  add_item(item) {
    let $item = this.create_item();
    $item.textContent = item || '';
    this.$list.appendChild($item);
  }

  connectedCallback() {
    this.$list = this.querySelector('.todo-list');

  }

}

customElements.define('x-todo-list', TodoList);