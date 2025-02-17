import { SCSButton } from "./scs-button";

export class SCSDropdown extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <button dd_button is="scs-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
          {{ $attributes->merge(['class' => 'text-blue-500 btn bg-white btn-round fas fa-plus dropdown-toggle']) }}>
          <span class="font-sans text-base pl-1">Agregar</span>
      </button>
    
    `;

    this.$button = this.querySelector('[dd_button]');
    this.$button.classList.add('text-blue-500','btn','bg-white','btn-round','fas','fa-plus','dropdown-toggle');


  }
}

customElements.define('scs-dropdown', SCSDropdown);