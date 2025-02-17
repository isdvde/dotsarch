import { SCSInput } from "./scs-input";
import { $create } from "../libs/utils";

/*
TODO:
 - terminar la funcion  init_value
 - verificar que al guardar el valor como 123.45 retorna 12345.00 y el hidden queda con valor 12345

*/

export class SCSInputPrice extends SCSInput {

	constructor(opts) {
		super(opts);
		this.$input.removeAttribute('name');
		this.$value = $create('input');
		this.$value.setAttribute('type', 'hidden');
		this.$value.setAttribute('name', opts.name);
		this.append(this.$value);

    this.$input.addEventListener('input', function(e) {
			let val = e.target.value;
			e.target.value = this.format_price(val).show;
			this.$value.value = this.format_price(val).value;
    }.bind(this));
	}

	init_value(val) {
		let value = String(val);
		let data = this.format_price(value);
		this.$value.value = data.value;
		this.$input.value = data.show;
	}

	format_price(val) {
		let value = val.replace(/[^\d]+/g, '');

		let whole_part = value.slice(0, -4);
		let decimal_part = value.slice(-4);

		let formattedValue = whole_part
			.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			.replace(/(0)(?=\d+)/g, "");

		formattedValue += `,${decimal_part}`;
		// return "VED " + formattedValue;
		return {
			show: formattedValue,
			value: parseFloat(formattedValue.replace(/\./g, '').replace(/\,/g, '.'))
		}
	} 

	set_validation(validate = true, message = '') {
		return {
			validate: validate,
			message: message
		}
	}

	validate() {
		this.validation = this.set_validation();
		if(!this.$input.value.replace(/[^\d]+/g, '').match(/\d+/)) {
			this.validation = this.set_validation(false, 'Debe completar este campo');
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

customElements.define('scs-input-price', SCSInputPrice);