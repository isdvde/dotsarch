import { TableComponent } from "../components/scs-table.js";
import { SCSForm } from "../components/scs-form.js";
import { $, $qs, clean } from "../libs/utils.js";

let $root = $('.card-body');
let api_url = 'api/compras/proveedor';

let page_title = document.title;
let title = "Proveedores";

let tipo_persona = [
  {text: "NATURAL"},
  {text: "JURIDICA"},
]

let status = [
  {text: "ACTIVO"},
  {text: "INACTIVO"}
]

const form_inputs = [

  { type: "text", title: "Razon Social", name: "razon_social", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo letras y espacios",
  }},

  { type: "select", title: "Tipo de persona", name: "tipo_persona", size: 6, required: '', options: {
    text: 'text',
    value: 'text',
    data: tipo_persona
  }},

  { type: "select", title: "Tipo de empresa", name: "tipo_empresa", size: 3, options: {
    text: 'text',
    value: 'text',
    data: tipo_persona
  }},

  { type: "text", title: "RIF", name: "rif", size: 3, validate: {
    required: '',
    pattern: "([GJV])-([0-9]{6,})",
    title: "Debe tener formato: (GVJ)-787346324",
  }},

  { type: "text", title: "Telefono", name: "telefono", size: 3, validate: {
    required: '',
    pattern: "([0-9]+)",
    title: "No cumple con el formato de numero telefonico",
  }},

  { type: "text", title: "Telefono (Secundario)", name: "telefono_alt", size: 3, validate: {
    pattern: "([0-9]+)",
    title: "No cumple con el formato de numero telefonico",
  }},

  { type: "select", title: "Estatus", name: "status", required: '', size: 3, options: {
    text: 'text',
    value: 'text',
    data: status
  }},

  { type: "text", title: "Email", name: "email", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z0-9\\\.\\\-])+(@){1}([a-zA-Z])+(\\\.)([a-zA-Z])+",
    title: "No cumple con el formato de email",
  }},

  { type: "text", title: "Representante", name: "representante", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo letras y espacios",
  }},

  { type: "text", title: "Direccion", name: "direccion", size: 12, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s0-9\\\-])*",
    title: "No cumple con el formato",
  }},

  { type: "text", title: "Nro. RNC", name: "numero_rnc", size: 3, validate: {
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo letras y espacios",
  }},

  { type: "text", title: "Nro. ALSOBOCARONI", name: "numero_alsobocaroni", size: 3, validate: {
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo letras y espacios",
  }},

  { type: "text", title: "Cod. Grupo Alsobocaroni", name: "codigo_grupo_alsobocaroni", size: 3, validate: {
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo letras y espacios",
  }},

  { type: "text", title: "Nro. RUC ALSOBOCARONI", name: "ruc_alsobocaroni", size: 3, validate: {
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo letras y espacios",
  }},

];

async function render_table() {
  clean($root);
  let $table = new TableComponent({
    columns: "Razon Social,Representante,Telefono,Email",
    attrs: "razon_social,representante,telefono,email",
    title: title,
    base_url: api_url,
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
    title: "Descripcion de Proveedor",
    url: api_url
  });

  for(let inp of form_inputs) {
    let input = InputFactory(inp.type).create(inp);
    $form.add_input(input);
  }

  let $tipo_persona = $qs($form,'select[name=tipo_persona]').closest('scs-select');
  let $tipo_empresa = $qs($form,'select[name=tipo_empresa]').closest('scs-select');

  $tipo_empresa.style.display = 'none';

  $tipo_persona.$select.addEventListener('change', function(e){
    let val = e.target.value;
    if(val === "JURIDICA"){
      $tipo_persona.size = 3;
      $tipo_persona.set_size();
      $tipo_empresa.style.display = '';
      return;
    }
    $tipo_persona.size = 6;
    $tipo_persona.set_size();
    $tipo_empresa.style.display = 'none';
    $tipo_empresa.$select.value = '';
    return;
  });


  if (create) {
    $form.querySelector('[name=status]').querySelector('option[selected]').removeAttribute('selected');
    $form.querySelector('[name=status]').querySelector('option[value=ACTIVO]').setAttribute('selected', '');
  }

  clean($root);
  $root.append($form);
  $form.$cancel.addEventListener('click', render_table);
  $form.add_post_submit_callback(render_table);
  return $form;
}

window.onload = async function(){
  await render_table();
}