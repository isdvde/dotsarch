export class XInput extends HTMLElement {
  constructor(opts){
    super();

    this.innerHTML = `
      <input type="text" placeholder="Ingrese un item">
    `

  }

  connectedCallback() {
    this.$input = this.querySelector('input');

  }
}
customElements.define('x-input', XInput);