export class SCSButton extends HTMLButtonElement {
  constructor(opts){
    super();
    this.opts = opts;
    this.classList.add('btn','btn-primary','btn-border','btn-round','border','px-4','py-2', 'btn-primary');
    this.textContent = this.opts?.title || '';
  }

  set_disabled(val=false){
    this.disabled = val;
  }
}

customElements.define('scs-button', SCSButton, {extends: 'button'});