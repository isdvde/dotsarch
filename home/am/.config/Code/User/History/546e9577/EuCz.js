export class SCSNotification extends HTMLElement {
  constructor(opts){
    super();

    this.innerHTML = `
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        prueba
      </div>
    </div>
    `
  }
}

customElements.define('scs-notification', SCSNotification);