import { TableComponent } from "../components/scs-table.js";
import { SCSForm } from "../components/scs-form.js";
import { SCSInput } from "../components/scs-input.js";
import { SCSSelect } from '../components/scs-select.js';
import { SCSInputPrice } from "../components/scs-input-price.js";
import { SCSSelectSearch } from "../components/scs-select-search.js";
import { $ } from "../libs/utils.js";

/*
TODO:
 - terminar formulario y verificar guardar y editar
- Verificar funcionamiento de tabla y botones de accion


*/

let $root = $('.card-body');

let page_title = document.title;
let title = "Proveedores";

function clean($root) {
  $root.innerHTML = '';
}

let tipo_persona = [
  {text: "NATURAL"},
  {text: "JURIDICA"},
]

const form_inputs = [

  { type: "text", title: "Razon Social", name: "razon_social", size: 6, validate: {
    required: '',
    pattern: "([a-za-z\\\s])*",
    title: "Solo letras y espacios",
  }},

  { type: "select", title: "Tipo de persona", name: "tipo_persona", size: 6, options: {
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

  { type: "text", title: "Telefono (Secundario)", name: "telefono_2", size: 3, validate: {
    pattern: "([0-9]+)",
    title: "No cumple con el formato de numero telefonico",
  }},

  { type: "text", title: "Email", name: "email", size: 3, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "No cumple con el formato de email",
  }},

  { type: "text", title: "Direccion", name: "direccion", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s0-9\-])*",
    title: "No cumple con el formato",
  }},

  { type: "text", title: "Representante", name: "representante", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo letras y espacios",
  }},

  { type: "text", title: "Nro. RCN", name: "rcn", size: 3, validate: {
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo letras y espacios",
  }},

  { type: "text", title: "Nro. ALSOBOCARONI", name: "alsobocaroni", size: 3, validate: {
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo letras y espacios",
  }},

  { type: "text", title: "Cod. Grupo Alsobocaroni", name: "grupo_alsobocaroni", size: 3, validate: {
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
    columns: "Nombre,Representante,Telefono,Email",
    attrs: "nombre,representante,telefono,email",
    title: title,
    base_url: "/api/compras/proveedores",
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
    url: '/api/compras/proveedores'
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

  let $tipo_persona = $form.querySelector('select[name=tipo_persona]').closest('scs-select');
  let $tipo_empresa = $form.querySelector('select[name=tipo_empresa]').closest('scs-select');
  console.log($tipo_persona, $tipo_empresa)

  $tipo_empresa.style.display = 'none';


  // if (create) {
  //   $form.querySelector('option[selected]').removeAttribute('selected');
  //   $form.querySelector('option[value=ACTIVO]').setAttribute('selected', '');
  // }

  clean($root);
  $root.append($form);
  $form.$cancel.addEventListener('click', render_table);
  $form.add_post_submit_callback(render_table);
  return $form;
}

// await render_table();
render_form();
