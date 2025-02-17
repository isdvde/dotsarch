export class SCSLoading extends HTMLElement {

	constructor() {
		super();
		// this.innerHTML = `
		// 	<div class="spinner-border text-danger"></div>
		// `
		this.classList.add('d-flex','justify-content-center');
		this.classList.add('spinner-border');
		this.classList.add('text-primary');
		this.setAttribute('role', 'status');
	}

	// connectedCallback() {
	// }
}

customElements.define('scs-loading', SCSLoading);
