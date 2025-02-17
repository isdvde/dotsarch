import { SCSInput } from "./scs-input.js";
import { $create, $qs } from "../libs/utils.js";

export class SCSSelect extends SCSInput {
	constructor(opts) {
		super(opts);
		this.innerHTML = `
			<div class="internal-input-cont">
				<label class="form-label mb-2"></label>
				<select class="form-select pl-2 py-2 text-gray-700 border h-10 border-gray-300 focus-visible:outline-none focus-visible:border-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm w-100"></select>
				<div class="invalid-feedback"></div>
			</div>
		`
		this.$select = $qs(this,'select');
		this.options = this.opts.options || {};
		this.$invalid = $qs(this,'.invalid-feedback');
		this.$label = $qs(this,'.form-label');
		this.url = opts.url || '';

		this.$select.setAttribute('name', this.opts.name || '');
		this.$label.textContent = this.opts.title || "Select";
		let $default_option = $create('option');
		let $option = $default_option.cloneNode();
		$default_option.setAttribute('selected', '');
		$default_option.setAttribute('value', "");
		$default_option.text = `${this.opts.title}...`;
		this.$select.append($default_option);

		try{
			for (let op of this.options.data) {
				let $op = $option.cloneNode();
				$op.setAttribute('value', op[this.options.value]);
				$op.text = op[this.options.text];
				this.$select.appendChild($op);
			}
		} catch(e) {
			console.log(String(e));
		}

		this.$select.addEventListener('blur', this.validate.bind(this));

		if(('required' in  this.opts)){
			let $span = $create('span');
			$span.textContent = '*';
			$span.style.color = "red";
			this.$label.append($span);
		}
	}

	validate() {
		if(!('required' in  this.opts)){
			this.validation = {
				validate: true,
				message: ''
			}

			this.show_validation_error();
			return this.validation;
		}

		if(!this.$select.value) {
			this.validation = {
				validate: false,
				message: 'Debe elegir una opcion'
			}
		} else {
			this.validation = {
				validate: true,
				message: ''
			}
		}
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
}


customElements.define('scs-select', SCSSelect);
