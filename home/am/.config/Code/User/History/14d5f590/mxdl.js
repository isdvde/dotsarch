import { $create } from '../lib/utils';

export class XTodoList extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class="todo__item">
        
        <p class="todo__item__p">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore et aspernatur laudantium, similique, a architecto quaerat esse atque nihil blanditiis ipsam eligendi! Consequuntur incidunt nam rem eaque ut iusto eum.</p>
        <button class="btn btn-red btn-small">Eliminar</button>
      </div>
    `;

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