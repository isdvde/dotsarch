import { TableComponent } from "../components/scs-table.js";
import { SCSDropdown } from "../components/scs-dropdown.js";
import { SCSFormModal } from "../components/scs-form-modal.js";
import { clean } from "../libs/utils.js";
import { SCSBaseModule } from "./scs-module-base.js";

class SCSLinea extends SCSBaseModule {
  constructor(opts) {
    super(opts);
    
    this.modal = false;


  }

async render_table() {
  clean($root);
  let $table = new TableComponent({
    columns: "Codigo,Descripcion,Tipo",
    attrs: "codigo,descripcion,tipo",
    title: title,
    base_url: api_url,
    edit: true,
  });

  let $dropdown_create = new SCSDropdown({
    title: "Agregar"
  });

  $dropdown_create.add_item({
    title: 'Servicios',
    callback: function() {
      if(!modal){
        render_form($table, 'SERVICIOS', true);
        open_modal(true);
      }
    }
  });

  $dropdown_create.add_item({
    title: 'Bienes',
    callback: function() {
      if(!modal){
        render_form($table, 'BIENES', true);
        open_modal(true);
      }
    }
  });

  $table.$button_container.innerHTML = '';
  $table.$button_container.append($dropdown_create);

	$root.append($table);
	await $table.render();
  $table.edit_action = function(){
    return render_form($table);
  }

  return $table;
}

render_form($table, type, create=false) {
  let $form = new SCSFormModal({
    title: type === 'servicios' ? "Linea Servicios" : "Linea Bienes",
    url: api_url
  });

  for(let inp of form_inputs) {
    let input = InputFactory(inp.type).create(inp);
    $form.add_input(input);
  }

  $form.querySelector('[name=tipo]').value = type || '';
  if(create) {
    $form.querySelector('option[selected]').removeAttribute('selected');
    $form.querySelector('option[value=ACTIVA]').setAttribute('selected', '');
  }

  $root.append($form);
  $form.$cancel.addEventListener('click', function(e){
    open_modal(false);
  });
  $form.add_post_submit_callback(async function(){
      $form.remove();
      open_modal(false);
      await $table.refresh();
    });
  return $form;
}


  open_modal(val) { this.modal = val; }

}

let title = "Lineas";
let api_url = 'api/compras/linea';

const form_inputs = [
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
    data: status
  }},

  { type: "hidden", name: "tipo" },
];


window.onload = async function() {
  var $table = await render_table();
}
