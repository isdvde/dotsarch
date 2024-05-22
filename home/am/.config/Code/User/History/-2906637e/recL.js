import {$} from '/js/libs/utils.js'
import {TableComponent} from '../components/table.js';
import { InputComponent } from '../components/x-input.js';
import { FormComponent } from '../components/x-form.js';
import { SelectComponent } from '../components/x-select.js';
import { SelectSearchComponent } from '../components/x-select search.js';
 
let title = "Profesores"
let page_title = document.title;
let $root = $('#data');

function clean($root) {
  $root.innerHTML = '';
}

$('.page-title').textContent = `Gestion de ${title}`;
$('#item-profesores').classList.add('active');

document.title = `${page_title} | ${title}`;

const form_inputs = [

  { type: "text", title: "Nombres", name: "nombres", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},

  { type: "text", title: "Apellidos", name: "apellidos", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},

  { type: "text", title: "Cedula", name: "cedula", size: 4, single: false, validate: {
    required: '',
    pattern: "([vV])(-){1}([0-9]{1,2})([0-9]{3}){2}",
    title: "Ingrese con formato: V-12345678",
  }},

  { type: 'select', title: "Estado Civil", name: "estado_civil", size: 4, single: false, options: [ 'SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO' ] },

  { type: 'select', title: "Sexo", name: "sexo", size: 4, single: false, options: ['M', 'F'] },

  { type: "text", title: "Titulo", name: "titulo", size: 4 },

  { type: "text", title: "Instituto Egreso", name: "instituto_egreso", size: 4, validate: {
    pattern: "([a-zA-Z0-9\\\s\\\-\\\.])*",
    title: "Solo Letras y espacios",
  }},

  { type: "number", title: "Año Egreso", name: "anno_graduado", size: 4, validate: {
    min: 1900,
    max: new Date().getFullYear(),
    title: `Debe ingresar un valor entre 1900 y ${new Date().getFullYear()}`
  }},

  { type: "text", title: "Direccion", name: "direccion", size: 4, validate: {
    required: '',
  }},

  { type: "text", title: "Telefono", name: "telefono", size: 4, validate: {
    required: '',
    minLength: '8',
    pattern: "(\\\+)?([0-9]+)",
    title: "Formato de numero equivocado",
  }},

  { type: "text", title: "Email", name: "email", size: 4, validate: {
    pattern: '([a-zA-Z0-9\\\._]){5,}(@){1}(([a-zA-Z])+(\\\.){1}([a-zA-Z])+)+',
    title: "Ingrese una direcion de correo valida",
  }},

  { type: "text", title: "Cargo", name: "cargo", size: 4, validate: {
    pattern: "([a-zA-Z\\\s])*",
    title: "Solo Letras y espacios",
  }},

  { type: "number", title: "Sueldo", name: "sueldo", size: 2, number_step: "0.01"},

  { type: "date", title: "Fecha Ingreso", name: "fecha_ingreso", size: 3, value: new Date().toISOString().slice(0, 10), validate: {
    required: '',
  }},

  { type: "date", title: "Fecha Egreso", name: "fecha_egreso", size: 3},
];

async function render_table() {
  clean($root);
  let $table = new TableComponent({
    columns: "Cedula,Nombres,Apellidos,Sexo,Direccion,Telefono",
    title: title,
    base_url: "/api/v1/profesores",
    edit: true,
  });

  clean($root);
	$root.appendChild($table);
	await $table.render();
  $table.$create_button.addEventListener('click', render_form );
  $table.edit_action = render_form;

  return $table;
}

function render_form() {
  clean($root);
  let $form = new FormComponent({
    title: "Agregar Profesor",
    url: '/api/v1/profesores'
  });

  for(let inp of form_inputs) {
    if(inp.type === 'select') {
      $form.add_input(new SelectComponent(inp));
    } else {
      $form.add_input(new InputComponent(inp));
    }
  }
  $root.appendChild($form);
  $form.$cancel.addEventListener('click', render_table);
  $form.add_post_submit_callback(render_table);
  return $form;
}

window.onload = async function() {
  await render_table();
}

let $select = new SelectSearchComponent({
  name: 'search',
  url: '/api/v1/profesores',
  label: ['cedula', 'nombres', 'apellidos'],
  value: 'uuid',
  required: true
});
// $root.appendChild($select);
// $root.appendChild(document.createElement('input'))