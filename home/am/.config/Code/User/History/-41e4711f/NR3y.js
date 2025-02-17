import { $qs, crudder, alerter } from "../libs/utils.js";
import { SCSDetalleFactory } from "../libs/factories/scs-detalle-factory.js";
import { SCSFormRequisicion } from "./scs-form-requisicion.js";
import { SCSButton } from "./scs-button.js";
import { SCSNotification } from "./scs-notification.js";

export class SCSFormSolicitud extends SCSFormRequisicion {
  constructor(opts) {
    super(opts);
  }

  get_data_to_edit(){
    this.data_to_edit = this.edit_data.solicitud;
  }

  add_detalles() {
    this.$detalles = SCSDetalleFactory(this.data_to_edit.tipo).create({solicitud: true});
    this.add_input(this.$detalles);
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
        uuid: this.edit_uuid
      });
      console.log(res)
      if('status' in res && res.status !== 'error'){
        alerter(`La solicitud ha sido enviada correctamente`).alert();
        this.hide_button(this.$enviar);
        this.hide_button(this.$submit);
        this.rename_button(this.$cancel, "Regresar");
        this.enviar_result = true;
        return;
      }

      let $notification = new SCSNotification({ data: res.data });
      this.append($notification);
    } catch (e) {
      console.error(e);
    }
  }

  set_readonly_detalle($det){
    let $detalles = $qs(this, 'scs-detalle-servicios, scs-detalle-bienes')
    console.log($detalles);
    for(let children of this.$detalles.$container.children){
      console.log(children)

    }

  }

  set_readonly_form(){
    super.set_readonly_form();
    this.set_readonly_detalle();
  }

  set_readonly($inp){
    let set_ro = {
      "default": (inp) => {
        if("$input" in inp) inp.$input.readOnly = true;
      },
      "select": (inp) => {
        inp.$select.disabled = true;
      },
      "select_search": (inp) => {
        inp.$search.readOnly = true;
        console.log(inp.$button);
        inp.$button.remove();
      },
      "hidden": (inp) => {
        return;	
      },
      "detalle": function(inp) {
        this.set_readonly_detalle(inp);
      }.bind(this),
    }

    if("$input" in $inp ){
      let f = set_ro[$inp.opts.type] || set_ro["default"];
      f($inp);
      return;
    }



  }

  async load_to_edit(uuid){
    await super.load_to_edit(uuid);

    if(this.data_to_edit.status != "TRANSCRITO"){
      this.hide_button(this.$submit);
      this.rename_button(this.$cancel, "Regresar");
      return;
    }

    this.$enviar = new SCSButton({title: "Enviar"});
    this.$enviar.addEventListener("click", async function(e){
      e.preventDefault();
      try {
        await this.enviar();
        this.set_readonly_form();
        // if('enviar_result' in this && this.enviar_result){
        //   this.render_table();
        // }
      } catch(e) {
        console.log(e);
      }
    }.bind(this));
    this.$footer.insertBefore(this.$enviar, this.$submit);
  }
}
customElements.define('scs-form-solicitud', SCSFormSolicitud);