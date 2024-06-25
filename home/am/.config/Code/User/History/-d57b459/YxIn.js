export class XInput extends HTMLElement {
  constructor(opts){
    super();

    this.innerHTML = `
      <input type="text" placeholder="Ingrese un item">
    `

  }

  connectedCallback() {

  }
}
customElements.define('x-input', XInput);