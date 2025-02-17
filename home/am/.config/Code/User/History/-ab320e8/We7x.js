import { $qs } from "../libs/utils.js";
import { SCSDetalleFactory } from "../libs/factories/scs-detalle-factory.js";
import { SCSForm } from './scs-form.js';

export class SCSFormRequisicion extends SCSForm {
  constructor(opts) {
    super(opts);
  }

  check_inputs_value(selector) {
    let data = {};
    for (let inp of this.$inputs) {
      let result = inp.validate();
      if (!result.validate) {
        inp.show_validation_error();
        this.ready = false;
      }

      let $internal_input = $qs(inp, 'input[name], select[name], textarea[name]');

      if (!$internal_input) continue;

      if ($internal_input.value !== '' && $internal_input.name !== '') {
        data = { ...data, [$internal_input.name]: $internal_input.value }
      }
    }
    data = {
      ...data,
      detalles: this.$form_body.lastChild.get_data(),
      detalles_delete: this.$form_body.lastChild.delete_data
    }
    return data;
  }

  add_detalles() {
    this.$detalles = SCSDetalleFactory(this.edit_data.requisicion.tipo).create();
    this.add_input(this.$detalles);
  }

	async load_to_edit(uuid) {
		this.edit_uuid = uuid;
		await this.load_data_to_edit(uuid);

		if(this.edit_data) {

      this.add_detalles();

			for(let [key, val] of Object.entries(this.edit_data.requisicion)) {
				let inp = $qs(this,`input[name=${key}],select[name=${key}],textarea[name=${key}]`);
				if(inp && val){
          try {
            this.load_input_value()[inp.type](inp, val);
          } catch {
            this.load_input_value()["default"](inp, val);
          }
				} 
			}

      for(let det of this.edit_data.detalles){
        // $detalles.add_detalle[this.edit_data.requisicion.tipo](det);
        $detalles.add_detalle(det);
      }
		}
	}
}
customElements.define('scs-form-requisicion', SCSFormRequisicion);