import { $create } from "../libs/utils.js";
import { SCSInput } from "./scs-input.js";

export class SCSTextArea extends SCSInput {

	constructor(opts) {
		super(opts);

		this.$input.remove();
		this.$input = $create('textarea');
		this.$input.classList.add("pl-2","py-2","text-gray-700","border","h-10","border-gray-300","focus-visible:outline-none","focus-visible:border-blue-600","focus:border-blue-600","focus:ring","focus:ring-blue-200","focus:ring-opacity-50","rounded-md","shadow-sm","w-100")
		this.$input.style.height = "8rem";
		this.$internal_input_cont.insertBefore(this.$input, this.$invalid);

		this.$input.setAttribute('name', this.opts.name || "");
		this.$input.setAttribute('value', this.opts.value || '');
		this.$input.value = this.opts.value || '';

		this.set_size();
	}
}

customElements.define('scs-textarea', SCSTextArea);
