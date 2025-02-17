import { SCSTable } from "../components/scs-table.js";
import { SCSDropdown } from "../components/scs-dropdown.js";
import { SCSFormModal } from "../components/scs-form-modal.js";
import { clean } from "../libs/utils.js";
import { SCSBaseModule } from "./scs-module-base.js";
import { SCSInputFactory } from "../libs/factories/scs-input-factory.js";
import { $qs } from "../libs/utils.js";

class SCSJefeLinea extends SCSBaseModule {
  constructor(opts) {
    super(opts);
    
    this.modal = false;
  }

  async render_table() {
    clean(this.$root);
    this.$table = new SCSTable({
      columns: this.columns,
      attrs: this.attrs,
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
      }.bind(this)
    });

    this.$table.$button_container.innerHTML = '';
    this.$table.$button_container.append($dropdown_create);

    this.$root.append(this.$table);
    await this.$table.render();
    this.$table.edit_action = function(){
      return this.render_form(this.$table);
    }.bind(this);

    return this.$table;
  }

  render_form(type, create=false) {
    this.$form = new SCSFormModal({
      title: type === 'servicios' ? "Linea Servicios" : "Linea Bienes",
      url: this.api_url
    });

    for(let inp of this.form_inputs) {
      let input = SCSInputFactory(inp.type).create(inp);
      this.$form.add_input(input);
    }

    $qs(this.$form, '[name=tipo]').value = type || '';
    if(create) {
      $qs(this.$form, 'option[selected]').removeAttribute('selected');
      $qs(this.$form, 'option[value=ACTIVO]').setAttribute('selected', '');
    }

    this.$root.append(this.$form);
    this.$form.$cancel.addEventListener('click', function(e){
      this.open_modal(false);
    }.bind(this));
    this.$form.add_post_submit_callback(async function(){
        this.$form.remove();
        this.open_modal(false);
        await this.$table.refresh();
      }.bind(this));
    return this.$form;
  }
  open_modal(val) { this.modal = val; }
}

let linea = new SCSLinea({
  title: "Lineas",
  api_url: 'api/compras/jefe-linea',
  columns: "Usuario,Linea",
  attrs: "ficha,linea",

  form_inputs: [

    { type: "select_search", title: "Linea", name: "codigo_linea_servicio", size: 6, url: 'api/compras/linea', value: 'id',
      label: ['descripcion'], required: true
    },

    { type: "select_search", title: "Usuario", name: "", size: 6, url: 'api/compras/usuario', value: 'ficha',
      label: ['descripcion'], required: true
    },
  ]
});

window.onload = async function() {
  await linea.render_table();
}
