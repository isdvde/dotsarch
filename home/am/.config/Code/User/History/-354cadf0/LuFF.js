export class SCSButton extends HTMLElement {
  constructor(){
    super();
    this.classList.add('btn','btn-primary','btn-border','btn-round','border','px-4','py-2 btn-primary');
  }
}

customElements.define('scs-button', SCSButton);