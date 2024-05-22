import { TableComponent } from "../components/scs-table";
import { FormComponent } from "../components/scs-form";

let $root = $('.card-body');

let page_title = document.title;
let title = "Articulos";

function clean($root) {
  $root.innerHTML = '';
}

async function render_table() {
  clean($root);
  let $table = new TableComponent({
    columns: "Cedula,Nombres,Apellidos,Sexo,Direccion,Telefono",
    title: title,
    base_url: "/api/v1/profesores",
    edit: true,
  });

  clean($root);
	$root.append($table);
	await $table.render();
  // $table.$create_button.addEventListener('click', render_form );
  $table.$create_button.onclick = render_form;
  console.log("🚀 ~ render_table ~ $table:", $table.$create_button);
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