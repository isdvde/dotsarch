import { SCSForm } from "./scs-form";

export class SCSFormModal extends SCSForm {
	constructor(opts) {
		super(opts);

		this.classList.add('position-absolute', 'z-1', 'shadow-lg');
		this.style.width = '60%';
		this.style.borderRadius = '1rem';
		// this.style.height = '28rem';
		this.style.top = '2rem';
		this.style.left = '20%';
		// this.style.overflowY = 'scroll';
		this.style.backgroundColor = '#fff';

		this.$cancel.addEventListener('click', function(e) {
			this.remove();
		}.bind(this));
	}
}

customElements.define('scs-form-modal', SCSFormModal);
