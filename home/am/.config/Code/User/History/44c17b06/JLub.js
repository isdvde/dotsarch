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


  // { type: "text", title: "Apellidos", name: "apellidos", size: 6, validate: {
  //   required: '',
  //   pattern: "([a-zA-Z\\\s])*",
  //   title: "Solo Letras y espacios",
  // }},

  // { type: "text", title: "Cedula", name: "cedula", size: 4, single: false, validate: {
  //   required: '',
  //   pattern: "([vV])(-){1}([0-9]{1,2})([0-9]{3}){2}",
  //   title: "Ingrese con formato: V-12345678",
  // }},

  // { type: 'select', title: "Estado Civil", name: "estado_civil", size: 4, single: false, options: [ 'SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO' ] },

  // { type: 'select', title: "Sexo", name: "sexo", size: 4, single: false, options: ['M', 'F'] },

  // { type: "text", title: "Titulo", name: "titulo", size: 4 },

  // { type: "text", title: "Instituto Egreso", name: "instituto_egreso", size: 4, validate: {
  //   pattern: "([a-zA-Z0-9\\\s\\\-\\\.])*",
  //   title: "Solo Letras y espacios",
  // }},

  // { type: "number", title: "Año Egreso", name: "anno_graduado", size: 4, validate: {
  //   min: 1900,
  //   max: new Date().getFullYear(),
  //   title: `Debe ingresar un valor entre 1900 y ${new Date().getFullYear()}`
  // }},

  // { type: "text", title: "Direccion", name: "direccion", size: 4, validate: {
  //   required: '',
  // }},

  // { type: "text", title: "Telefono", name: "telefono", size: 4, validate: {
  //   required: '',
  //   minLength: '8',
  //   pattern: "(\\\+)?([0-9]+)",
  //   title: "Formato de numero equivocado",
  // }},

  // { type: "text", title: "Email", name: "email", size: 4, validate: {
  //   pattern: '([a-zA-Z0-9\\\._]){5,}(@){1}(([a-zA-Z])+(\\\.){1}([a-zA-Z])+)+',
  //   title: "Ingrese una direcion de correo valida",
  // }},

  // { type: "text", title: "Cargo", name: "cargo", size: 4, validate: {
  //   pattern: "([a-zA-Z\\\s])*",
  //   title: "Solo Letras y espacios",
  // }},

  // { type: "number", title: "Sueldo", name: "sueldo", size: 2, number_step: "0.01"},

  // { type: "date", title: "Fecha Ingreso", name: "fecha_ingreso", size: 3, value: new Date().toISOString().slice(0, 10), validate: {
  //   required: '',
  // }},

  // { type: "date", title: "Fecha Egreso", name: "fecha_egreso", size: 3},
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