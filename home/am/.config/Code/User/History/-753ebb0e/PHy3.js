import { TableComponent } from "../components/scs-table.js";
import { SCSInput } from "../components/scs-input.js";
import { SCSSelect } from '../components/scs-select.js';
import { SCSInputPrice } from "../components/scs-input-price.js";
import { SCSDropdown } from "../components/scs-dropdown.js";
import { SCSFormModal } from "../components/scs-form-modal.js";
import { SCSInputHidden } from "../components/scs-input-hidden.js";

let $root = $('.card-body');
var modal = false;

let page_title = document.title;
let title = "Lineas";
let api_url = '/api/compras/linea';

function clean($root) {
  $root.innerHTML = '';
}

function open_modal(val) {
  modal = val;
}

let status = [
  {text: "ACTIVA"},
  {text: "INACTIVA"},
]

const form_inputs = [
  { type: "text", title: "Descripcion", name: "descripcion", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
    maxLength: 255,
  }},

  { type: "select", title: "Estatus", name: "status", size: 6, options: {
    text: 'text',
    value: 'text',
    data: status
  }},

  { type: "hidden", name: "tipo" },
];

async function render_table() {
  clean($root);
  let $table = new TableComponent({
    columns: "Descripcion,Tipo",
    attrs: "descripcion,tipo",
    title: title,
    base_url: "/api/compras/linea",
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

  // clean($root);
	$root.append($table);
	await $table.render();
  // $table.$create_button.addEventListener('click', render_form);
  $table.edit_action = function(){
    return render_form($table);
  }

  return $table;
}

function render_form($table, type, create=false) {
  let $form = new SCSFormModal({
    title: type === 'servicios' ? "Linea Servicios" : "Linea Bienes",
    url: '/api/compras/linea'
  });

  let form_types = {
    'select': SCSSelect,
    'price': SCSInputPrice,
    'hidden': SCSInputHidden,
    'default': SCSInput,
  }

  for(let inp of form_inputs) {
    let input = form_types[inp.type] || form_types['default'];
    $form.add_input(new input(inp));
  }

  $form.querySelector('[name=tipo]').value = type || '';
  if(create) {
    $form.querySelector('option[selected]').removeAttribute('selected');
    $form.querySelector('option[value=ACTIVA]').setAttribute('selected', '');
  }

  // clean($root);
  $root.append($form);
  // $form.$cancel.addEventListener('click', render_table);
  $form.$cancel.addEventListener('click', function(e){
    open_modal(false);
  });
  $form.add_post_submit_callback(async function(){
      $form.remove();
      open_modal(false);
      // clean($root);
      await $table.refresh();
      // await $table.render();
    });
  return $form;
}

window.onload = async function() {
  var $table = await render_table();
}
