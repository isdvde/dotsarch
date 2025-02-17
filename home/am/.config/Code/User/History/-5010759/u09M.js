import { SCSDetalleServicios } from "../../components/scs-detalle-servicios";
import { SCSDetalleBienes } from "../../components/scs-detalle-bienes";

export const SCSDetalleFactory = (type) => {
  let detalle_types = {
    'BIENES': SCSDetalleBienes,
    'SERVICIOS': SCSDetalleServicios,
  }
  return {
    create: (opts) => {
      let input = input_types[type] || input_types['default'];
      return new input(opts);
    }
  }
}