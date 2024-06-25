import { TableComponent } from "../components/scs-table.js";
import { SCSForm } from "../components/scs-form.js";
import { SCSInput } from "../components/scs-input.js";
import { SCSSelect } from '../components/scs-select.js';
import { SCSInputPrice } from "../components/scs-input-price.js";

let $root = $('.card-body');

let page_title = document.title;
let title = "Articulos";

function clean($root) {
  $root.innerHTML = '';
}

// let lineas = (await fetch('http://localhost:9000/lineas?_sort=descripcion').then(res => res.json())).lineas;
// let unidades = (await fetch('http://localhost:9000/unidades?_sort=descripcion').then(res => res.json())).unidades_medida;

const form_inputs = [

  { type: "text", title: "Descripcion", name: "descripcion", size: 4, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},

  { type: "select", title: "Linea", name: "linea", size: 4, options: {
    text: 'descripcion',
    value: 'id',
    data: lineas
  }},

  { type: "select", title: "Unidad de Medida", name: "unidad_medida", size: 4, options: {
    text: 'descripcion',
    value: 'id',
    data: unidades
  }},

  { type: "text", title: "Cod. CCCE (Opcional)", name: "codigo_ccce", size: 3, validate: {
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},

  { type: "text", title: "Cod. OCEPRE (Opcional)", name: "codigo_ocepre", size: 3, validate: {
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},

  { type: "text", title: "Cod. CNU (Opcional)", name: "codigo_cnu", size: 3, validate: {
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},

  { type: "price", title: "Precio", name: "precio", size: 3, validate: {
    required: '',
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
    title: "Descripcion de Articulo",
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
