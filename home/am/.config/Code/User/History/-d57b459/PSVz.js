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
    this.value = '';

    this.$input.oninput = this.update_value.bind(this);
  }

  update_value() {
    this.value = this.get_value();
  }

  clean() {
    this.value = '';
    this.$input.value = '';
  }

  get_value() {
    return this.$input.value;
  }
}

customElements.define('x-input', XInput);