import { SCSDetalleServicios } from "../../components/scs-detalle-servicios";
import { SCSDetalleBienes } from "../../components/scs-detalle-bienes";

export const SCSDetalleFactory = (type) => {
  let detalle_types = {
    'BIENES': SCSDetalleBienes,
    'SERVICIOS': SCSDetalleServicios,
  }
  return {
    create: (opts) => {
      let detalle = detalle_types[type] || null;
      return new detalle(opts);
    }
  }
}

customElements.define('scs-detalle', SCSDetalleFactory);