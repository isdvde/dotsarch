import { SCSInput } from "../../components/scs-input.js";
import { SCSSelect } from '../../components/scs-select.js';
import { SCSInputPrice } from "../../components/scs-input-price.js";
import { SCSSelectSearch } from "../../components/scs-select-search.js";
import { SCSTextArea } from "../../components/scs-textarea.js";
import { SCSDropdown } from "../../components/scs-dropdown.js";
import { SCSInputHidden } from "../../components/scs-input-hidden.js";
import { SCSDetalle } from "../../components/scs-detalle.js";

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

//   create_input(opts){
//     let input = this.types[this.type] || this.types['default'];
//     return new input(opts);
//   }
// }

export const SCSInputFactory = (type) => {
  let input_types = {
    'select': SCSSelect,
    'select_search': SCSSelectSearch,
    'price': SCSInputPrice,
    'textarea': SCSTextArea,
    'default': SCSInput,
    'hidden': SCSInputHidden,
  }
  return {
    create: (opts) => {
      let input = input_types[type] || input_types['default'];
      return new input(opts);
    }
  }
}