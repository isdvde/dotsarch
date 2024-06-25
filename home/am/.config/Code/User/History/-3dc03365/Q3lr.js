export class TodoList extends HTMLElement {

  constructor() {
    super();

    this.innerHTML = `
    <ul class="todo-list">
    </ul>
    `
  }

  create_item() {
    return document.createElement('li');
  }

  add_item(opts) {
    let name = opts.name || '';
    let $item = this.create_item();
    $item.

  }

  connectedCallback() {
    this.$list = this.querySelector('.todo-list');

  }

}

customElements.define('x-todo-list', TodoList);