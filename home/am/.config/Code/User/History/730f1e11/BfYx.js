export class SCSDropdown extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = ``;
  }
}

customElements.define('scs-dropdown', SCSDropdown);