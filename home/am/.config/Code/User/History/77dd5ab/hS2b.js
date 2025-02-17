import { Validator } from "../libs/validator.js";
import { InputComponent } from "./x-input.js";

export class SelectComponent extends InputComponent {

	constructor(opts) {
		super(opts);
		this.innerHTML = `
			<div class="internal-input-cont">
			<!-- <label for="" class="form-label"></label> -->
			<label class="form-label"></label>
			<input type="" class="form-control" name="" placeholder="">
			<div class="valid-feedback"></div>
			<div class="invalid-feedback"></div>
			</div>
		`
	}
}

customElements.define('x-select', SelectComponent);
