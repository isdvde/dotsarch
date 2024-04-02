export class FormComponent extends HTMLElement {
	constructor(title) {
		super();
		this.innerHTML = `
			<div class="card">
				<div class="card-header"></div>
				<div class="card-body">
					<form class="needs-validation" novalidate accept-charset="utf-8">
					<div class="row g-2 form-body">
					</div>
					<button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Guardar</button>
					</form>
				</div>
			</div>
		`
		this.$form_title = this.querySelector('.card-header');
		this.$form = this.querySelector('form');
		this.$submit = this.querySelector('button');
		this.$form_body = this.querySelector('.form-body');
		this.title = title || "Form";
	}

	connectedCallback(){
		this.$form_title.textContent = this.title;
	}

	append_to_body($node) {
		this.$form_body.appendChild($node);
		return this;
	}

}

customElements.define('x-form', FormComponent);
