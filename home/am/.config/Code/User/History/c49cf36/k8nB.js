export class SCSLoading extends HTMLElement {

	constructor() {
		super();
		this.innerHTML = `
			<div class="spinner-border" role="status">
		`
	}

	connectedCallback() {
		this.classList.add('d-flex','justify-content-center');
		this.classList.add('spinner-border');
		this.setAttribute('role', 'status');
	}
}

customElements.define('scs-loading', SCSLoading);
