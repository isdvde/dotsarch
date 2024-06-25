import { Validator } from "../libs/validator.js";
import { InputComponent } from "./x-input.js";

export class SelectComponent extends InputComponent {

	constructor(opts) {
		super(opts);
		this.innerHTML = `
			<div class="internal-input-cont">
			<!-- <label for="" class="form-label"></label> -->
			<label class="form-label"></label>
			<!-- <input type="" class="form-control" name="" placeholder=""> -->
			<select class="form-select">
				<option selected><option>
			</select>
			<div class="valid-feedback"></div>
			<div class="invalid-feedback"></div>
			</div>
		`
		this.$select = this.querySelector('select');
		this.$default_option = this.querySelector('option[selected]');
	}

	connectedCallback() {
		parent.connectedCallback();
		console.log(this.$select)
		console.log(this.$default_option)
	}

}


customElements.define('x-select', SelectComponent);
