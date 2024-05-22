import { Validator } from "../libs/validator.js";

export class InputComponent extends HTMLElement {

	constructor(opts) {
		super();
		this.innerHTML = `
				<label class="form-label"></label>
				<input type="" class="pl-2 py-2 text-gray-700 border h-10 border-gray-300 focus-visible:outline-none focus-visible:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm" name="" placeholder="">
				<div class="invalid-feedback"></div>
		`

		this.opts = opts;
		this.$invalid = this.querySelector('.invalid-feedback');
		this.$label = this.querySelector('.form-label');
		this.$input = this.querySelector('input');
		this.$internal_input_cont = this.querySelector('.internal-input-cont');
		// this.size_factor = 12/this.opts.inline;
		this.size_factor = this.opts.size;

		// if(!this.opts.single) {
		// 	this.classList.add('mb-3',`col-md-${this.size_factor}`);
		// } else {
		// 	this.$internal_input_cont.classList.add('mb-3',`col-md-${this.size_factor}`);
		// }

		this.validator_params = opts.validator_params;

		this.$input.addEventListener('change', this.update_value());

	}

	connectedCallback() {
		// this.$label.setAttribute('for', this.opts.name || "");
		// this.$label.textContent = this.opts.title || "Input";
		this.$label.textContent = this.opts.title || "Input";
		this.$input.setAttribute('type', this.opts.type || 'text');
		this.$input.setAttribute('name', this.opts.name || "");
		this.$input.setAttribute('value', this.opts.value || '');
		this.$input.value = this.opts.value || '';
		// this.$input.setAttribute(
    //   "placeholder",
    //   this.opts.placeholder || this.opts.title || ""
    // );

		this.$input.onblur = this.validate.bind(this);

		if(this.$input.getAttribute("type") === "number" && this.opts.number_step) {
			this.$input.setAttribute("step", this.opts.number_step);

		}
	}

	validate() {

		for (let attr in this.opts.validate) {
			this.$input.setAttribute(attr, this.opts.validate[attr]);
		}

		// this.update_value();
		// this.validator = new Validator(this.$input.value, this.opts.validate);
		this.validator = new Validator(this.$input);
		this.validation = this.validator.validate();
		this.show_validation_error();
		return this.validation;
	}

	show_validation_error() {
		if(!this.validation.validate) {
			this.$invalid.textContent = this.validation.message || '';
			this.$invalid.style.display = 'block';
			this.$input.scrollIntoView();
			return this;
		}
		this.$invalid.style.display = "none";
		return this;
	}

	update_value() {
		this.value = this.$input.value;		
	}
}

customElements.define('scs-input', InputComponent);
