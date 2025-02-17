import { SCSTable } from "../components/scs-table.js";
import { SCSFormModal } from "../components/scs-form-modal.js";
import { clean } from "../libs/utils.js";
import { SCSBaseModule } from "./scs-module-base.js";
import { SCSInputFactory } from "../libs/factories/scs-input-factory.js";

class SCSUnidadMedida extends SCSBaseModule {
  constructor(opts){
    super(opts);
  }

  async render_table() {
    clean(this.$root);
      this.$table = new SCSTable({
      columns: "Descripcion,Codigo",
      attrs: "descripcion,codigo",
      title: this.title,
      base_url: this.api_url,
      edit: true,
    });

    clean($root);
    this.$root.appendChild(this.$table);
    await this.$table.render();
    this.$table.$create_button.addEventListener('click', function(e) {
      if(!this.modal){
        this.render_form(this.$table, true);
        this.open_modal(true);
      }
    }.bind(this));

    this.$table.edit_action = this.render_form.bind(this);
    // this.$table.edit_action = function(){
    //   return render_form($table);
    // };

    return this.$table;
  }

  render_form($table, create=false) {
    this.$form = new SCSFormModal({
      title: "Unidad de Medida",
      url: this.api_url
    });

    for(let inp of form_inputs) {
      let input = SCSInputFactory(inp.type).create(inp);
      $form.add_input(input);
    }

    this.$root.append(this.$form);

    this.$form.$cancel.addEventListener('click', function(e){
      open_modal(false);
    }.bind(this));

    this.$form.add_post_submit_callback(async function(){
      this.$form.remove();
      this.open_modal(false);
      await this.$table.refresh();
    }.bind(this));

    this.$descripcion = $qs(this.$form, '[name=descripcion]');
    this.$codigo = $qs(this.$form, '[name=codigo]');
    
    if(create) {
      this.$descripcion.addEventListener('blur', function(e){
        let abbrev = e.target.value.split('').filter(function(cur, idx, src) {
          return idx % 2 == 0;
        }).join('').replace(/[aeiou\s]/gi, '').toUpperCase();
        
        this.$codigo.value = abbrev;
      }.bind(this));
    }

    return $form;
  }

  open_modal(val) { this.modal = val; }

}

let $root = document.querySelector('.card-body');
let modal = false;
let api_url = 'api/compras/unidad-medida';

let page_title = document.title;
let title = "Unidad Medida";


const form_inputs = [
  { type: "text", title: "Descripcion", name: "descripcion", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z0-9\\\s])*",
    title: "Solo Letras, numeros y espacios",
    maxLegth: 255,
  }},

  { type: "text", title: "Codigo", name: "codigo", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z])*",
    title: "Solo Letras",
    maxLegth: 7,
  }},
];


window.onload = async function() {
  var $table = await render_table();
}
