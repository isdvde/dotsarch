import { TableComponent } from "../components/scs-table.js";
import { SCSInput } from "../components/scs-input.js";
import { SCSSelect } from '../components/scs-select.js';
import { SCSInputPrice } from "../components/scs-input-price.js";
import { SCSFormModal } from "../components/scs-form-modal.js";

let $root = $('.card-body');

let page_title = document.title;
let title = "Unidad Medida";

function clean($root) {
  $root.innerHTML = '';
}

const form_inputs = [
  { type: "text", title: "Descripcion", name: "descripcion", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},

  { type: "text", title: "Codigo", name: "codigo", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z])*",
    title: "Solo Letras y espacios",
  }},
];

async function render_table() {
  clean($root);
  let $table = new TableComponent({
    columns: "Descripcion,Linea,Unidad de Medida",
    title: title,
    base_url: "/api/compras/unidad-medida",
    edit: true,
  });

  clean($root);
	$root.append($table);
	await $table.render();
  // $table.edit_action = render_form;

  console.log($table.$create_button);
  return $table;
}

function render_form() {
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

  clean($root);
  $root.append($form);
  $form.$cancel.addEventListener('click', render_table);
  $form.add_post_submit_callback(render_table);

  let $descripcion = $form.querySelector('[name=descripcion]');
  let $codigo = $form.querySelector('[name=codigo]');
  
  $descripcion.addEventListener('blur', function(e){
    let abbrev = e.target.value.split('').filter(function(cur, idx, src) {
      return idx % 2 == 0;
    }).join('').replace(/[aeiou\s]/gi, '').toUpperCase();

    $codigo.value = abbrev;
  });

  return $form;
}

await render_table();
// render_form();
