import { $qs } from "../libs/utils.js";
import { SCSDetalleFactory } from "../libs/factories/scs-detalle-factory.js";
import { SCSFormRequisicion } from "./scs-form-requisicion.js";

export class SCSFormSolicitud extends SCSFormRequisicion {
  constructor(opts) {
    super(opts);
    this.get_data_to_edit();
  }

  get_data_to_edit(){
    this.data_to_edit = this.edit_data.solicitud;
  }

  add_detalles() {
    console.log(this.edit_data)
    this.$detalles = SCSDetalleFactory(this.data_to_edit.tipo).create({solicitud: true});
    this.add_input(this.$detalles);
  }
}
customElements.define('scs-form-solicitud', SCSFormSolicitud);