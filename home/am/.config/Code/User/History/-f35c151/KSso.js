import { SCSInput } from "./scs-input";

export class SCSInputHidden extends SCSInput {

	constructor(opts) {
		super(opts);
		this.innerHTML = `
				<input  type="hidden">
		`;

		this.opts = opts;
		this.$input = this.querySelector('input');


		this.$input.setAttribute('name', this.opts.name || "");
		this.$input.setAttribute('value', this.opts.value || '');
		this.$input.value = this.opts.value || '';
	}

	set_readonly(){
		return;
	}
}

customElements.define('scs-input-hidden', SCSInputHidden);
