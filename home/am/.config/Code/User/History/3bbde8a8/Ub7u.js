import { $create, $qs } from "../libs/utils.js";
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
		this.$invalid = $qs(this,'.invalid-feedback');
		this.$label = $qs(this,'.form-label');
		this.$input = $qs(this,'input');
		this.$internal_input_cont = $qs(this,'.internal-input-cont');
		this.size = this.opts.size;


		this.$label.textContent = this.opts.title || "";
		this.$input.setAttribute('type', this.opts.type || 'text');
		this.$input.setAttribute('name', this.opts.name || "");
		this.$input.setAttribute('value', this.opts.value || '');
		this.$input.setAttribute('placeholder', this.opts.placeholder || '');
		this.$input.value = this.opts.value || '';
		this.$input.style.fontSize = "0.9em";


		this.set_size();

		this.$input.addEventListener('blur', this.validate.bind(this));

		if(this.$input.getAttribute("type") === "number" && this.opts.number_step) {
			this.$input.setAttribute("step", this.opts.number_step);
		}

		this.validator_params = opts.validator_params;
		this.$input.addEventListener('change', this.update_value());

		if('validate' in this.opts &&  'required' in this.opts.validate){
			let $span = $create('span');
			$span.textContent = '*';
			$span.style.color = "red";
			this.$label.append($span);
		}

		if('readonly' in this.opts){
			this.set_readonly(true);
		}
	}

	set_readonly(val=false) {
		this.$input.readOnly = val;
	}

	set_size(){
		this.className = '';
		if(!this.opts.single) {
			this.classList.add('mb-6',`col-md-${this.size}`);
		} else {
			this.$internal_input_cont.classList.add('mb-3',`col-md-${this.size}`);
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
