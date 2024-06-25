import { $create } from "../libs/utils.js";
import { SCSInput } from "./scs-input.js";

export class SCSTextArea extends SCSInput {

	constructor(opts) {
		super(opts);

		this.$input.remove();
		this.$input = $create('textarea');
		this.$input.classList.add("pl-2","py-2","text-gray-700","border","h-10","border-gray-300","focus-visible:outline-none","focus-visible:border-blue-600","focus:border-blue-600","focus:ring","focus:ring-blue-200","focus:ring-opacity-50","rounded-md","shadow-sm","w-100")
		this.$input.style.height = `${this.opts.height}rem` || "8rem";
		this.$internal_input_cont.insertBefore(this.$input, this.$invalid);

		this.$input.setAttribute('name', this.opts.name || "");
		this.$input.setAttribute('value', this.opts.value || '');
		this.$input.value = this.opts.value || '';

		this.set_size();

		this.$input.addEventListener('blur', this.validate.bind(this));

		// if(this.$input.getAttribute("type") === "number" && this.opts.number_step) {
		// 	this.$input.setAttribute("step", this.opts.number_step);
		// }

		// this.validator_params = opts.validator_params;
		// this.$input.addEventListener('change', this.update_value());

		// if('validate' in this.opts &&  'required' in this.opts.validate){
		// 	let $span = $create('span');
		// 	$span.textContent = '*';
		// 	$span.style.color = "red";
		// 	this.$label.append($span);
		// }
	}

	// set_size(){
	// 	this.className = '';
	// 	if(!this.opts.single) {
	// 		this.classList.add('mb-6',`col-md-${this.size}`);
	// 	} else {
	// 		this.$internal_input_cont.classList.add('mb-3',`col-md-${this.size}`);
	// 	}
	// }

	// validate() {
	// 	for (let attr in this.opts.validate) {
	// 		this.$input.setAttribute(attr, this.opts.validate[attr]);
	// 	}

	// 	this.validator = new Validator(this.$input);
	// 	this.validation = this.validator.validate();
	// 	this.show_validation_error();
	// 	return this.validation;
	// }

	// show_validation_error() {
	// 	if(!this.validation.validate) {
	// 		this.$invalid.textContent = this.validation.message || '';
	// 		this.$invalid.style.display = 'block';
	// 		this.$input.scrollIntoView();
	// 		return this;
	// 	}
	// 	this.$invalid.style.display = "none";
	// 	return this;
	// }

	// update_value() {
	// 	this.value = this.$input.value;		
	// }
}

customElements.define('scs-textarea', SCSTextArea);
