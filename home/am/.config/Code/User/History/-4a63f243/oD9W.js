import { TableComponent } from "../components/scs-table.js";
import { SCSForm } from "../components/scs-form.js";
import { SCSInput } from "../components/scs-input.js";
import { SCSSelect } from '../components/scs-select.js';
import { SCSInputPrice } from "../components/scs-input-price.js";

let $root = $('.card-body');

let page_title = document.title;
let title = "Unidad Medida";

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
    //base_url: "http://localhost:9000/articulos",
    base_url: "",
    edit: true,
  });


  clean($root);
	$root.append($table);
	await $table.render();
  $table.$create_button.addEventListener('click', render_form);
  $table.edit_action = render_form;

  console.log($table.$create_button);
  return $table;
}

function render_form() {
  clean($root);
  let $form = new SCSForm({
    title: "Descripcion de Unidad Medida",
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
