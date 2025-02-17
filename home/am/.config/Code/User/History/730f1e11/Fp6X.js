import { SCSButton } from "./scs-button";

export class SCSDropdown extends HTMLElement {
  constructor(opts) {
    super();
    this.innerHTML = `
      <button dd_button is="scs-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          <span dd_button__span class="font-sans text-base pl-1"></span>
      </button>
    
    `;

    this.opts = opts;
    this.$button = this.querySelector('[dd_button]');
    this.$button.classList.add('text-blue-500','btn','bg-white','btn-round','fas','fa-plus','dropdown-toggle');
    this.$button_title = this.querySelector('[dd_button__span]');
    this.$button_title.textContent = 


  }
}

customElements.define('scs-dropdown', SCSDropdown);