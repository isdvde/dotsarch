class TodoList extends HTMLElement {

  constructor() {
    super();

    this.innerHTML = `
    <ul class="todo-list">
    </ul>
    `
  }

  connectedCallback() {

  }

}

customElements.define('x-todo-list', TodoList);