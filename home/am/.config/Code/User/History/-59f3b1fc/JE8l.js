import { SCSRequisicionBase } from "./scs-requisicion-base.js";

export class SCSRequisicion extends SCSRequisicionBase{
  constructor(opts){
    super(opts);
  }
}

let requisicion = new SCSRequisicion({

  api_url: 'api/compras/requisicion',
  title: "Requisicion",

  form_inputs: [
    { type: "text", title: "Nro. Requisicion", name: "numero", size: 3 },
    { type: "text", title: "Estatus", name: "status", size: 4 },
    { type: "date", title: "Fecha Requisicion", name: "fecha", size: 4, validate: {
      required: ''
    }},
    { type: "text", title: "Trim.", name: "trimestre", size: 1 },

    { type: "text", title: "Dependencia Solicitante", name: "dependencia_solicitante", size: 12 },
    { type: "select_search", title: "Linea", name: "codigo_linea_servicio", size: 6, url: 'api/compras/linea', value: 'id',
      label: ['descripcion'], required: true
    },

    { type: "select", title: "Prioridad", name: "prioridad", size: 3, options: {
      text: 'text',
      value: 'text',
      data: SCSRequisicion.prioridad
    }},
    { type: "date", title: "Fecha Recepcion", name: "fecha_recepcion", size: 3},


    { type: "textarea", title: "Justificacion", name: "justificacion", height: 4, size: 12, validate: {
      required: '',
      pattern: "([a-zA-Z\\\s])*",
      title: "Solo Letras y espacios",
    }},

    { type: "hidden", name: "codigo_dependencia_solicitante" },
    { type: "hidden", name: "tipo" },
  ],
  columns: "Número,Unidad Solicitante,Fecha,Estatus",
  attrs: "numero,codigo_dependencia_solicitante,fecha,status",
});

await requisicion.render_table();