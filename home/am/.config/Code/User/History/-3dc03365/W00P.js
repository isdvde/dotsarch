export class TodoList extends HTMLElement {

  constructor() {
    super();

    this.innerHTML = `
    <ul class="todo-list">
    </ul>
    `
    window.localStorage.setItem('todo', []);
    this.storage = window.localStorage.todo;
  }

  create_item() {
    return document.createElement('li');
  }

  add_item(opts) {
    let name = opts.value || '';
    let $item = this.create_item();
    $item.textContent = name;
    this.$list.appendChild($item);
    localStorage.todo.push(value);
    console.log(localStorage);
  }

  connectedCallback() {
    this.$list = this.querySelector('.todo-list');

  }

}

customElements.define('x-todo-list', TodoList);