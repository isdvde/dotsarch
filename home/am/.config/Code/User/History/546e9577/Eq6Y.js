export class SCSNotification extends HTMLElement {
  constructor(opts){
    super();

    this.innerHTML = `
			<div card>
				<div class="card-body">
          prueba
				</div>
			</div>
    `
  }
}

customElements.define('scs-notification', SCSNotification);