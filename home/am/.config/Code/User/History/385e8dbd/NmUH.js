import { Validator } from "../libs/validator.js";

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
		this.validator_params = opts.validator_params;

		this.$input.addEventListener('change', this.update_value());

	}

	connectedCallback() {
		this.$label.setAttribute('for', this.opts.name || "");
		this.$label.textContent = this.opts.title || "Input";
		this.$input.setAttribute('type', this.opts.type || 'text');
		this.$input.setAttribute('name', this.opts.name || "");
		this.$input.setAttribute('placeholder', this.opts.placeholder || this.opts.title || "");
		this.$input.value = '';

		// this.$input.addEventListener('change', this.validate());
		// this.$input.addEventListener('onblur', this.validate);
		this.$input.onblur = this.validate.bind(this);
	}

	validate() {
		this.update_value();
		this.validator = new Validator(this.$input.value, this.opts.validate);
		this.validation = this.validator.validate();
		this.show_validation_error();
		return this.validation;
	}

	show_validation_error() {
		if(!this.validation.validate) {
			console.log('error')
			this.$invalid.textContent = this.validation.message || '';
			this.$invalid.style.display = 'block';
			return this;
		}

	}

	update_value() {
		this.value = this.$input.value;		
	}
}

customElements.define('x-input', InputComponent);
