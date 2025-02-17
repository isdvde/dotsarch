import { $qs } from "../libs/utils.js";
import { SCSDetalleFactory } from "../libs/factories/scs-detalle-factory.js";
import { SCSFormRequisicion } from "./scs-form-requisicion.js";

export class SCSFormSolicitud extends SCSFormRequisicion {
  constructor(opts) {
    super(opts);
  }

  add_detalles() {
    this.$detalles = SCSDetalleFactory(this.edit_data.requisicion.tipo).create();
    this.add_input(this.$detalles);
  }
}
customElements.define('scs-form-solicitud', SCSFormSolicitud);