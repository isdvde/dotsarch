import { Validator } from "../libs/validator.js";
import { InputComponent } from "./x-input.js";

export class SelectComponent extends InputComponent {

	constructor(opts) {
		super(opts);
	}
}

customElements.define('x-select', SelectComponent);
