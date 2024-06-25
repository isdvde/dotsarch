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
    $div.querySelector('p').textContent = this.value;
    $div.querySelector('button').onclick = function(e) {
      console.dir(e.target.closest('div'));
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