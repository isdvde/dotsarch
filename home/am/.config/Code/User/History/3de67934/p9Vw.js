import { TableComponent } from "../components/scs-table.js";
import { SCSForm } from "../components/scs-form.js";
import { SCSInput } from "../components/scs-input.js";
import { SCSSelect } from '../components/scs-select.js';
import { SCSInputPrice } from "../components/scs-input-price.js";
import { SCSSelectSearch } from "../components/scs-select-search.js";
import { $ } from "../libs/utils.js";

let $root = $('.card-body');

let page_title = document.title;
let title = "Articulos";
let api_url = 'api/compras/articulo';

function clean($root) {
  $root.innerHTML = '';
}

let status = [
  {text: "ACTIVO"},
  {text: "INACTIVO"},
]

const form_inputs = [

  { type: "text", title: "Codigo", name: "codigo", size: 3, validate: {
    required: '',
    pattern: "([a-zA-Z0-9])*",
    title: "Solo Letras y espacios",
    maxLength: 8,
  }},


  { type: "text", title: "Descripcion", name: "descripcion", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z0-9\\\s])*",
    title: "Solo Letras y espacios",
    maxLength: 255,
  }},

  { type: "select", title: "Estatus", name: "status", size: 3, options: {
    text: 'text',
    value: 'text',
    data: status
  }},

  { type: "select_search", title: "Linea", name: "linea_id", size: 6, url: 'api/compras/linea', value: 'id',
    label: ['descripcion'], required: true
  },

  { type: "select_search", title: "Unidad de Medida", name: "unidad_medida_id", size: 6, url: 'api/compras/unidad-medida', 
    value: 'id', label: ['descripcion'], required: true
  },


  { type: "text", title: "Cod. CCCE", name: "codigo_art_ccce", size: 3, validate: {
    pattern: "([0-9])*",
    title: "Solo Letras y espacios",
    maxLength: 9,
  }},

  { type: "text", title: "Cod. OCEPRE", name: "codigo_ocepre", size: 3, validate: {
    pattern: "([0-9])*",
    title: "Solo Letras y espacios",
    maxLength: 12,
  }},

  { type: "text", title: "Cod. CNU", name: "codigo_cnu", size: 3, validate: {
    pattern: "([0-9])*",
    title: "Solo Letras y espacios",
    maxLength: 8,
  }},

  { type: "price", title: "Precio", name: "ultimo_precio", size: 3, validate: {
  // { type: "price", title: "Precio", name: "precio", size: 3, validate: {
    required: '',
  }},
];

async function render_table() {
  clean($root);
  let $table = new TableComponent({
    columns: "Descripcion,Linea,Unidad de Medida",
    attrs: "descripcion,linea,unidad_medida",
    title: title,
    base_url: api_url,
    // base_url: '/api/compras/articulo',
    edit: true,
  });


  clean($root);
	$root.append($table);
	await $table.render();
  $table.$create_button.addEventListener('click', function(){
    render_form(true);
  })
  $table.edit_action = render_form;

  return $table;
}

function render_form(create=false) {
  clean($root);
  let $form = new SCSForm({
    title: "Descripcion de Articulo",
    url: api_url
  });

  let form_types = {
    'select': SCSSelect,
    'select_search': SCSSelectSearch,
    'price': SCSInputPrice,
    'default': SCSInput,
  }

  for(let inp of form_inputs) {
    let input = form_types[inp.type] || form_types['default'];
    $form.add_input(new input(inp));
  }

  if (create) {
    $form.querySelector('option[selected]').removeAttribute('selected');
    $form.querySelector('option[value=ACTIVO]').setAttribute('selected', '');
  }

  clean($root);
  $root.append($form);
  $form.$cancel.addEventListener('click', render_table);
  $form.add_post_submit_callback(render_table);
  return $form;
}

window.onload =  async function(){
  await render_table();
}
// render_form();
