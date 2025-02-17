class ButtonComponent extends HTMLElement {
  constructor(){
    super();
    this.classList.add('btn','btn-primary','btn-border','btn-round','border','px-4','py-2')

  }
}

customElements.define('scs-button', ButtonComponent, {extends: 'button'});