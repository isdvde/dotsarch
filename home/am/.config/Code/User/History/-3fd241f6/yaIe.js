import { SCSInput } from "../components/scs-input.js";
import { SCSSelect } from '../components/scs-select.js';
import { SCSInputPrice } from "../components/scs-input-price.js";
import { SCSSelectSearch } from "../components/scs-select-search.js";
import { SCSTextArea } from "../components/scs-textarea.js";
import { SCSDropdown } from "../components/scs-dropdown.js";
import { SCSInputHidden } from "../components/scs-input-hidden.js";
import { SCSDetalle } from "../components/scs-detalle.js";

// class InputFactory {
//   constructor(opts){
//     this.opts = opts;
//     this.types = {
//       'select': SCSSelect,
//       'select_search': SCSSelectSearch,
//       'price': SCSInputPrice,
//       'textarea': SCSTextArea,
//       'default': SCSInput,
//       'hidden': SCSInputHidden,
//     }
//     this.type = this.opts.type || 'default';
//   }

//   create_input(){
//     return new this.types[this.type] || this.types['default'];
//   }
// }

export const InputFactory = (type) => {
  types = {
    'select': SCSSelect,
    'select_search': SCSSelectSearch,
    'price': SCSInputPrice,
    'textarea': SCSTextArea,
    'default': SCSInput,
    'hidden': SCSInputHidden,
  }
  return

}