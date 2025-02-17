import { Validator } from "../libs/validator.js";

export class SCSInput extends HTMLElement {

	constructor(opts) {
		super();
		this.innerHTML = `
			<div class="internal-input-cont">
			  <div class="form-label mb-2"></div>
				<input autocomplete="off" type="" class="pl-2 py-2 text-gray-700 border h-10 border-gray-300 focus-visible:outline-none focus-visible:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm w-100" name="" placeholder="">
				<div class="invalid-feedback"></div>
			</div>
		`;

		this.opts = opts;
		this.$invalid = this.querySelector('.invalid-feedback');
		this.$label = this.querySelector('.form-label');
		this.$input = this.querySelector('input');
		this.$internal_input_cont = this.querySelector('.internal-input-cont');
		this.size_factor = this.opts.size;


		this.$label.textContent = this.opts.title || "Input";
		this.$input.setAttribute('type', this.opts.type || 'text');
		this.$input.setAttribute('name', this.opts.name || "");
		this.$input.setAttribute('value', this.opts.value || '');
		this.$input.value = this.opts.value || '';

		if(!this.opts.single) {
			this.classList.add('mb-6',`col-md-${this.size_factor}`);
		} else {
			this.$internal_input_cont.classList.add('mb-3',`col-md-${this.size_factor}`);
		}

		this.$input.addEventListener('blur', this.validate.bind(this));

		if(this.$input.getAttribute("type") === "number" && this.opts.number_step) {
			this.$input.setAttribute("step", this.opts.number_step);
		}

		this.validator_params = opts.validator_params;
		this.$input.addEventListener('change', this.update_value());

		if(this.opts.validate){
			let label_style = window.getComputedStyle(this.$label);
			console.log("🚀 ~ SCSInput ~ constructor ~ label_style:", label_style)
			// label_style.setProperty('::after', 'content: "*"');
			// label_style.setProperty('::after', 'color: red');

			this.$label.setProperty('::after', 'content: "*"');
			this.$label.setProperty('::after', 'color: red');

		}
	}

	validate() {
		for (let attr in this.opts.validate) {
			this.$input.setAttribute(attr, this.opts.validate[attr]);
		}

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

customElements.define('scs-input', SCSInput);
