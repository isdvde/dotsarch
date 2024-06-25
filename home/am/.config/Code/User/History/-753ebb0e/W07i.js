import { TableComponent } from "../components/scs-table.js";
import { SCSForm } from "../components/scs-form.js";
import { SCSInput } from "../components/scs-input.js";
import { SCSSelect } from '../components/scs-select.js';
import { SCSInputPrice } from "../components/scs-input-price.js";
import { SCSDropdown } from "../components/scs-dropdown.js";

let $root = $('.card-body');

let page_title = document.title;
let title = "Lineas";

function clean($root) {
  $root.innerHTML = '';
}

// let lineas = (await fetch('http://localhost:9000/lineas?_sort=descripcion').then(res => res.json())).lineas;
// let unidades = (await fetch('http://localhost:9000/unidades?_sort=descripcion').then(res => res.json())).unidades_medida;


const form_inputs = [

  { type: "text", title: "Descripcion", name: "descripcion", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},
];

async function render_table() {
  clean($root);
  let $table = new TableComponent({
    columns: "Descripcion,Linea,Unidad de Medida",
    title: title,
    //base_url: "http://localhost:9000/articulos",
    base_url: "",
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

  $table.button_container.innerHTML = '';
  $table.button_container.append($dropdown_create);

  clean($root);
	$root.append($table);
	await $table.render();
  $table.$create_button.addEventListener('click', render_form);
  $table.edit_action = render_form;

  console.log($table.$create_button);
  return $table;
}

function render_form(type) {
  clean($root);
  let $form = new SCSForm({
    title: type === 'suministro' ? "Linea Suministros" : "Linea Bienes",
    url: 'http://localhost:9000/articulos'
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
  return $form;
}

await render_table();
// render_form();
