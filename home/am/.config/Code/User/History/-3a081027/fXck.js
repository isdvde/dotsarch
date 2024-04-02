import {$, $create} from '/js/libs/utils.js'
import {TableComponent} from '../components/table.js';
import { InputComponent } from '../components/x-input.js';
import { FormComponent } from '../components/x-form.js';
import { Validator } from '/js/libs/validator.js';
 
let title = "Profesores"
let page_title = document.title;
let $root = $('#data');

$('.page-title').textContent = `Gestion de ${title}`;
$('#item-profesores').classList.add('active');

document.title = `${page_title} | ${title}`;

// let $table  = new TableComponent(
// 	$root,
// 	'Cedula,Nombres,Apellidos,Sexo,Direccion,Telefono',
// 	title,
// 	'http://localhost:4000/api/v1/profesores'
// )

// window.onload = async function() {
// 	$root.appendChild($table);
// 	await $table.render();
// }

let $input_cedula = new InputComponent({
	'type': 'text',
	'title': 'Cedula',
	'name': 'cedula',
	'inline': true,
});

let $input_nombres = new InputComponent({
	'type': 'text',
	'title': 'Nombres',
	'name': 'nombres',
	'inline': true,
});


let $form = new FormComponent(
	title = "Agregar Profesor"
);

$root.appendChild($form);

$form.append_to_body($input_cedula).append_to_body($input_nombres);

// $root.appendChild($input);
// $root.appendChild($input2);


let validator = new Validator("hola", 'string,length:5')

console.log(validator.validate())