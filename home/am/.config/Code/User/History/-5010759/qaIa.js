import { SCSDetalleServicios } from "../../components/scs-detalle-servicios";
import { SCSDetalleBienes } from "../../components/scs-detalle-bienes";

export const SCSDetalleFactory = (type) => {
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