export class InputComponent extends HTMLElement {

	// constructor(input_type, input_name, inline) {
	constructor(opts) {
		super();
		this.innerHTML = `
			<label for="" class="form-label"></label>
			<input type="" class="form-control" name="" placeholder="">
			<div class="valid-feedback"></div>
			<div class="invalid-feedback"></div>
		`

		this.opts = opts;
		this.$valid = this.querySelector('.valid-feedback');
		this.$invalid = this.querySelector('.invalid-feedback');
		this.$label = this.querySelector('.form-label');
		this.$input = this.querySelector('input');
		this.size_factor = this.opts.inline === true ? 6 : 12 ;

		this.classList.add('mb-3',`col-md-${this.size_factor}`);

	}

	connectedCallback() {
		this.$label.setAttribute('for', this.opts.name || "");
		this.$label.textContent = this.opts.title || "Input";
		this.$input.setAttribute('type', this.opts.type || 'text');
		this.$input.setAttribute('name', this.opts.name || "");
		this.$input.setAttribute('placeholder', this.opts.placeholder || this.opts.title || "");

		// this.addEventListener('onblur',)
	}
}

customElements.define('x-input', InputComponent);
