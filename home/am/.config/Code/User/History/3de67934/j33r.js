import { TableComponent } from "../components/scs-table.js";
import { SCSForm } from "../components/scs-form.js";
import { $, $qs, clean } from "../libs/utils.js";
import { InputFactory } from "../libs/factories/input-factory.js";

let $root = $('.card-body');

let page_title = document.title;
let title = "Articulos";
let api_url = 'api/compras/articulo';

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
    label: ['codigo','descripcion'], required: true
  },

  { type: "select_search", title: "Unidad de Medida", name: "unidad_medida_id", size: 6, url: 'api/compras/unidad-medida', 
    value: 'id', label: ['codigo','descripcion'], required: true
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
    required: '',
  }},
];

async function render_table() {
  clean($root);
  let $table = new TableComponent({
    columns: "Codigo,Descripcion,Linea,Unidad de Medida",
    attrs: "codigo,descripcion,linea,unidad_medida",
    title: title,
    base_url: api_url,
    edit: true,
  });

  clean($root);
	$root.append($table);
	await $table.render();
  $table.$create_button.addEventListener('click', function(){
    render_form(true);
  });
  $table.edit_action = render_form;

  return $table;
}

function render_form(create=false) {
  clean($root);
  let $form = new SCSForm({
    title: "Descripcion de Articulo",
    url: api_url
  });

  for(let inp of form_inputs) {
    let input = InputFactory(inp.type).create(inp);
    $form.add_input(input);
  }

  if (create) {
    $qs($form,'option[selected]').removeAttribute('selected');
    $qs($form,'option[value=ACTIVO]').setAttribute('selected', '');
  }

  $qs($form,'[name="codigo"]').setAttribute('readonly','');

  clean($root);
  $root.append($form);
  $form.$cancel.addEventListener('click', render_table);
  $form.add_post_submit_callback(render_table);
  return $form;
}

window.onload =  async function(){
  await render_table();
}