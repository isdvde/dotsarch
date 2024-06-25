import { Validator } from "../libs/validator.js";

export class InputComponent extends HTMLElement {

	constructor(opts) {
		super();
		this.innerHTML = `
			<div class="internal-input-cont">
			<!-- <label for="" class="form-label"></label> -->
			<label for="" class="form-label"></label>
			<input type="" class="form-control" name="" placeholder="">
			<div class="valid-feedback"></div>
			<div class="invalid-feedback"></div>
			</div>
		`

		this.opts = opts;
		this.$valid = this.querySelector('.valid-feedback');
		this.$invalid = this.querySelector('.invalid-feedback');
		this.$label = this.querySelector('.form-label');
		this.$input = this.querySelector('input');
		this.$internal_input_cont = this.querySelector('.internal-input-cont');
		// this.size_factor = 12/this.opts.inline;
		this.size_factor = this.opts.size;

		if(!this.opts.single) {
			this.classList.add('mb-3',`col-md-${this.size_factor}`);
		} else {
			this.$internal_input_cont.classList.add('mb-3',`col-md-${this.size_factor}`);
		}

		this.validator_params = opts.validator_params;

		this.$input.addEventListener('change', this.update_value());

	}

	connectedCallback() {
		// this.$label.setAttribute('for', this.opts.name || "");
		// this.$label.textContent = this.opts.title || "Input";
		this.$label.textContent = this.opts.title || "Input";
		this.$input.setAttribute('type', this.opts.type || 'text');
		this.$input.setAttribute('name', this.opts.name || "");
		// this.$input.setAttribute(
    //   "placeholder",
    //   this.opts.placeholder || this.opts.title || ""
    // );

		this.$input.value = '';
		this.$input.onblur = this.validate.bind(this);

		if(this.$input.getAttribute("type") === "number" && this.opts.number_step) {
			this.$input.setAttribute("step", this.opts.number_step);

		}
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
			this.$invalid.textContent = this.validation.message || '';
			this.$invalid.style.display = 'block';
			return this;
		}
		this.$invalid.style.display = "none";
		return this;
	}

	update_value() {
		this.value = this.$input.value;		
	}
}

customElements.define('x-input', InputComponent);
