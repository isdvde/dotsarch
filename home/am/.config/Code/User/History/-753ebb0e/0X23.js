import { TableComponent } from "../components/scs-table.js";
import { SCSInput } from "../components/scs-input.js";
import { SCSSelect } from '../components/scs-select.js';
import { SCSInputPrice } from "../components/scs-input-price.js";
import { SCSDropdown } from "../components/scs-dropdown.js";
import { SCSFormModal } from "../components/scs-form-modal.js";

let $root = $('.card-body');
var modal = false;

let page_title = document.title;
let title = "Lineas";

function clean($root) {
  $root.innerHTML = '';
}

function open_modal(val) {
  modal = val;
  console.log("🚀 ~ open_modal ~ modal:", modal)
}

const form_inputs = [
  { type: "text", title: "Descripcion", name: "descripcion", size: 12, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},
];

async function render_table() {
  clean($root);
  let $table = new TableComponent({
    columns: "Descripcion,Acciones",
    title: title,
    base_url: "/api/compras/linea",
    edit: true,
  });

  let $dropdown_create = new SCSDropdown({
    title: "Agregar"
  });

  $dropdown_create.add_item({
    title: 'Suministro',
    callback: function() {
      render_form('suministro');
    }
  });

  $dropdown_create.add_item({
    title: 'Bienes',
    callback: function() {
      render_form('bienes');
    }
  });

  $table.$button_container.innerHTML = '';
  $table.$button_container.append($dropdown_create);

  $table.$create_button.addEventListener('click', function(e) {
    console.log("🚀 ~ $table.$create_button.addEventListener ~ modal:", modal)
    if(!modal){
      render_form();
      open_modal(true);
    }
  });

  clean($root);
	$root.append($table);
	await $table.render();
  // $table.$create_button.addEventListener('click', render_form);
  // $table.edit_action = render_form;

  return $table;
}

function render_form(type) {
  // clean($root);
  let $form = new SCSFormModal({
    title: type === 'suministro' ? "Linea Suministros" : "Linea Bienes",
    url: '/api/compras/linea'
  });

  let form_types = {
    'select': SCSSelect,
    'price': SCSInputPrice,
    'default': SCSInput,
  }

  for(let inp of form_inputs) {
    let input = form_types[inp.type] || form_types['default'];
    $form.add_input(new input(inp));
  }

  // clean($root);
  $root.append($form);
  // $form.$cancel.addEventListener('click', render_table);
  $form.$cancel.addEventListener('click', function(e){
    open_modal(false);
  });
  // $form.add_post_submit_callback(render_table);
  return $form;
}

await render_table();
// render_form();
