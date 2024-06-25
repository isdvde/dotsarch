import { SCSButton } from "./scs-button";

export class SCSDropdown extends HTMLElement {
  constructor(opts) {
    super();
    this.innerHTML = `
      <button dd_button is="scs-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          <span dd_button__span class="font-sans text-base pl-1"></span>
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      </div>
    `;

    this.opts = opts;
    this.$button = this.querySelector('[dd_button]');
    this.$button.classList.add('text-blue-500','btn','bg-white','btn-round','dropdown-toggle');
    this.$button_title = this.querySelector('[dd_button__span]');
    this.$button_title.textContent = this.opts.title || this.getAttribute('title') || '';
    this.$dropdown = this.querySelector('.dropdown-menu');
  }

  add_item(opts) {
    let but = document.createElement(opts.type || 'button');
    but.classList.add('dropdown-item','cursor-pointer');
    but.textContent = opts.title || 'Titulo';
    but.addEventListener(opts.event || 'click', opts.callback);

    this.$dropdown.appendChild(but);
  }
}

customElements.define('scs-dropdown', SCSDropdown);