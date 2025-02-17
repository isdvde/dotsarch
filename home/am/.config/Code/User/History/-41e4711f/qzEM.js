import { $qs } from "../libs/utils.js";
import { SCSDetalleFactory } from "../libs/factories/scs-detalle-factory.js";
import { SCSFormRequisicion } from "./scs-form-requisicion.js";

export class SCSFormSolicitud extends SCSFormRequisicion {
  constructor(opts) {
    super(opts);
  }

  add_detalle(){
    let $detalles = SCSDetalleFactory(this.edit_data.requisicion.tipo).create({solicitud: true});
    this.add_input($detalles);
  }
}
customElements.define('scs-form-requisicion', SCSFormRequisicion);