export class XInput extends HTMLElement {
  constructor(opts){
    super();

    this.innerHTML = `
      <input type="text" class="input">
      <button class="btn btn-green">Agregar</button>
    `;
    this.classList.add('todo__form');
    this.$input = this.querySelector('input');
    this.$button = this.querySelector('button');
  }

  clean() {
    this.$input.value = '';
  }

  get_value() {
    return this.$input.value;
  }

  connectedCallback() {
  }
}
customElements.define('x-input', XInput);