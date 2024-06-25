import { TableComponent } from "../components/scs-table";
import { SCSForm } from "../components/scs-form";
import { SCSInput } from "../components/scs-input";
import { SCSSelect } from '../components/scs-select.js';
import { SCSSelectSearch } from '../components/scs-select-search.js';
import { SCSInputPrice } from "../components/scs-input-price.js";

let $root = $('.card-body');

let page_title = document.title;
let title = "Articulos";

function clean($root) {
  $root.innerHTML = '';
}

const form_inputs = [

  { type: "text", title: "Descripcion", name: "descripcion", size: 4, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},

  { type: "text", title: "Linea", name: "descripcion", size: 4},

  { type: "text", title: "Unidad de Medida", name: "descripcion", size: 4},

  { type: "text", title: "Cod. CCCE (Opcional)", name: "codigo_ccce", size: 3, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},

  { type: "text", title: "Cod. OCEPRE (Opcional)", name: "codigo_ocepre", size: 3, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},

  { type: "text", title: "Cod. CNU (Opcional)", name: "codigo_cnu", size: 3, validate: {
    required: '',
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
    base_url: "/api/v1/profesores",
    edit: true,
  });

  clean($root);
	$root.append($table);
	await $table.render();
  // $table.$create_button.addEventListener('click', render_form );
  $table.$create_button.onclick = render_form;
  $table.edit_action = render_form;

  return $table;
}

function render_form() {
  clean($root);
  let $form = new SCSForm({
    title: "Descripcion de Articulo",
    url: '/api/v1/profesores'
  });

  let form_types = {
    'select': SCSSelect,
    'price': SCSInputPrice,
    'default': SCSInput,
  }


  for(let inp of form_inputs) {
    let input = form_types[inp.type] || form_types['default'];
    $form.add_input(new input(inp));
    // if(inp.type === 'select') {
    //   $form.add_input(new SCSSelect(inp));
    // } else if(inp.type === 'price') {
    //   $form.add_input(new SCSInputPrice(inp));
    // } else {
    //   $form.add_input(new SCSInput(inp));
    // }
  }
  clean($root);
  $root.append($form);
  $form.$cancel.addEventListener('click', render_table);
  $form.add_post_submit_callback(render_table);
  return $form;
}


window.onload = async function() {
  // await render_table();
  render_form();
}