import { SCSTable } from "../components/scs-table.js";
import { SCSDropdown } from "../components/scs-dropdown.js";
import { SCSFormModal } from "../components/scs-form-modal.js";
import { $qs, clean } from "../libs/utils.js";
import { SCSBaseModule } from "./scs-module-base.js";
import { SCSInputFactory } from "../libs/factories/scs-input-factory.js";

class SCSLinea extends SCSBaseModule {
  constructor(opts) {
    super(opts);
    
    this.modal = false;
  }

  async render_table() {
    clean(this.$root);
    this.$table = new SCSTable({
      columns: "Codigo,Descripcion,Tipo",
      attrs: "codigo,descripcion,tipo",
      title: this.title,
      base_url: this.api_url,
      edit: true,
    });

    let $dropdown_create = new SCSDropdown({
      title: "Agregar"
    });

    $dropdown_create.add_item({
      title: 'Servicios',
      callback: function() {
        if(!this.modal){
          this.render_form(this.$table, 'SERVICIOS', true);
          this.open_modal(true);
        }
      }.bind(this)
    });

    $dropdown_create.add_item({
      title: 'Bienes',
      callback: function() {
        if(!this.modal){
          this.render_form(this.$table, 'BIENES', true);
          this.open_modal(true);
        }
      }
    });

    this.$table.$button_container.innerHTML = '';
    this.$table.$button_container.append($dropdown_create);

    this.$root.append(this.$table);
    await this.$table.render();
    this.$table.edit_action = function(){
      return this.render_form(this.$table);
    }

    return this.$table;
  }

  render_form($table, type, create=false) {
    this.$form = new SCSFormModal({
      title: type === 'servicios' ? "Linea Servicios" : "Linea Bienes",
      url: this.api_url
    });

    for(let inp of this.form_inputs) {
      let input = SCSInputFactory(inp.type).create(inp);
      this.$form.add_input(input);
    }

    console.log(this.$form);

    $qs(this.$form, '[name=tipo]').value = type || '';
    if(create) {
      $qs(this.$form, 'option[selected]').removeAttribute('selected');
      $qs(this.$form, 'option[value=ACTIVA]').setAttribute('selected', '');
    }

    this.$root.append(this.$form);
    this.$form.$cancel.addEventListener('click', function(e){
      this.open_modal(false);
    });
    this.$form.add_post_submit_callback(async function(){
        this.$form.remove();
        this.open_modal(false);
        await this.$table.refresh();
      });
    return this.$form;
  }


  open_modal(val) { this.modal = val; }

}

let linea = new SCSLinea({
  title: "Lineas",
  api_url: 'api/compras/linea',

  form_inputs: [
    { type: "text", title: "Codigo", name: "codigo", size: 4, validate: {
      required: '',
      pattern: "([a-zA-Z0-9])*",
      title: "Solo Letras y espacios",
      maxLength: 8,
    }},

    { type: "text", title: "Descripcion", name: "descripcion", size: 4, validate: {
      required: '',
      pattern: "([a-zA-Z\\\s])*",
      title: "Solo Letras y espacios",
      maxLength: 255,
    }},

    { type: "select", title: "Estatus", name: "status", size: 4, options: {
      text: 'text',
      value: 'text',
      data: SCSLinea.status
    }},

    { type: "hidden", name: "tipo" },
  ]
});



window.onload = async function() {

  console.log(SCSLinea.status)
  // var this.$table = await render_table();
  await linea.render_table();
}
