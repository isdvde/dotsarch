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
		this.classList.add('fixed', 'z-1', 'shadow-sm', 'top-10', 'right-0');
		// this.style.width = '60%';
		// this.style.borderRadius = '1rem';
		// // this.style.height = '28rem';
		// this.style.top = '2rem';
		// this.style.left = '20%';
		// // this.style.overflowY = 'scroll';
		// this.style.backgroundColor = '#fff';
  }
}

customElements.define('scs-notification', SCSNotification);