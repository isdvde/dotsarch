import { Validator } from "../libs/validator.js";
import { InputComponent } from "./scs-input.js";

export class SelectComponent extends InputComponent {

	constructor(opts) {
		super(opts);
		this.innerHTML = `
			<div class="internal-input-cont">
			<!-- <label for="" class="form-label"></label> -->
			<label class="form-label"></label>
			<!-- <input type="" class="form-control" name="" placeholder=""> -->
			<select class="form-select">
			</select>
			<div class="valid-feedback"></div>
			<div class="invalid-feedback"></div>
			</div>
		`
		this.$select = this.querySelector('select');
		this.options = this.opts.options || {};
		this.$invalid = this.querySelector('.invalid-feedback');
	}

	connectedCallback() {
		super.connectedCallback();
		this.$select.setAttribute('name', this.opts.name || '');
		let $default_option = document.createElement('option');
		let $option = $default_option.cloneNode();
		$default_option.setAttribute('selected', '');
		$default_option.setAttribute('value', "");
		$default_option.text = `${this.opts.title}...`;
		this.$select.append($default_option);

		for(let val of this.options){
			let $op = $option.cloneNode();
			$op.setAttribute('value', val);
			$op.text = val;
			this.$select.appendChild($op);
		}

		this.$select.onblur = this.validate.bind(this);
	}

	validate() {
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


customElements.define('scs-select', SelectComponent);
