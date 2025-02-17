import { SCSRequisicionBase } from "./scs-requisicion-base.js";
import { SCSDetalleFactory } from "../libs/factories/scs-detalle-factory.js";
import { SCSFormSolicitud } from "../components/scs-form-solicitud.js";
import { SCSButton } from "../components/scs-button";
import { SCSNotification } from "../components/scs-notification.js";
import { crudder, alerter } from "../libs/utils";

export class SCSSolicitud extends SCSRequisicionBase {
  constructor(opts){
    super(opts);
  }

  add_detalle(){
    let $detalles = SCSDetalleFactory(this.form_type).create({solicitud: true});
    this.$form.add_input($detalles);
  }

  add_form(){
    this.$form = new SCSFormSolicitud({
      title: "Detalles de Requisicion",
      url: this.api_url,
      form_inputs: this.form_inputs,
    });
    this.$form.load_inputs();
  }

  async enviar(){
    let opts = { 
      headers: {
        'X-CSRF-TOKEN': this.csrf_token || ''
      }
     }
     let url = `${this.url.href}/enviar`;

    try {
      let res = await crudder(url, opts).create({
        uuid: this.$form.edit_uuid
      });
      console.log(res)
      if('status' in res && res.status !== 'error'){
        alerter(`La solicitud ha sido enviada correctamente`).alert();
        this.$form.hide_button(this.$form.$enviar);
        this.$form.hide_button(this.$form.$submit);
        this.$form.rename_button(this.$form.$cancel, "Regresar");
        this.enviar_result = true;
      } else {
        let $notification = new SCSNotification({ data: res.data });
        this.$form.append($notification);
        return;
      }
    } catch (e) {
      console.error(e);
    }
  }

  *render_form(create=false){
    super.render_form(create);
    yield this.$form;
    console.dir(this.$form);
    console.log(this.$form.edit_data);
    if(!this.create){
      this.$form.$enviar = new SCSButton({title: "Enviar"});
      this.$form.$enviar.addEventListener("click", async function(e){
        e.preventDefault();
        try {
          await this.enviar();
          if('enviar_result' in this && this.enviar_result){
            this.render_table();
          }
        } catch(e) {
          console.log(e);
        }
      }.bind(this));
      this.$form.$footer.insertBefore(this.$form.$enviar, this.$form.$submit);
    }
    // return this.$form;
  }
}

let solicitud = new SCSSolicitud({
  api_url: 'api/compras/solicitud',
  title: "Solicitud",

  form_inputs: [
    { type: "text", title: "Nro. Requisicion", name: "numero", size: 3 },

    { type: "text", title: "Dependencia Solicitante", name: "dependencia_solicitante", size: 6 },

    { type: "text", title: "Estatus", name: "status", size: 2 },
    { type: "text", title: "Trim.", name: "trimestre", size: 1 },

    { type: "select_search", title: "Linea", name: "codigo_linea_servicio", size: 6, url: 'api/compras/linea', value: 'id',
      label: ['descripcion'], required: true
    },

    { type: "select", title: "Prioridad", name: "prioridad", size: 2, options: {
      text: 'text',
      value: 'text',
      data: SCSSolicitud.prioridad
    }},

    { type: "date", title: "Fecha Solicitud", name: "fecha", size: 2, validate: {
      required: ''
    }},

    { type: "date", title: "Fecha Enviado", name: "fecha_enviado", size: 2, readonly: true},

    { type: "textarea", title: "Justificacion", name: "justificacion", height: 4, size: 12, validate: {
      required: '',
      pattern: "([a-zA-Z\\\s])*",
      title: "Solo Letras y espacios",
    }},

    { type: "hidden", name: "codigo_dependencia_solicitante" },
    { type: "hidden", name: "tipo" },
  ],
  columns: "Unidad Solicitante,Fecha,Estatus",
  attrs: "codigo_dependencia_solicitante,fecha,status",
});

await solicitud.render_table();