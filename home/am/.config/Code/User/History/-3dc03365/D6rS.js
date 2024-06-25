class TodoList extends HTMLElement {

  constructor() {
    super();

    this.innerHTML = `
    <ul class="todo-list">
    </ul>
    `
  }

  connectedCallback() {
    this.$list = this.querySelector('.todo-list');

  }

}

customElements.define('x-todo-list', TodoList);