import { TableComponent } from "../components/scs-table.js";
import { SCSInput } from "../components/scs-input.js";
import { SCSSelect } from '../components/scs-select.js';
import { SCSInputPrice } from "../components/scs-input-price.js";
import { SCSFormModal } from "../components/scs-form-modal.js";
import { clean } from "../libs/utils.js";

let $root = document.querySelector('.card-body');
let modal = false;
let api_url = 'api/compras/unidad-medida';

let page_title = document.title;
let title = "Unidad Medida";

function open_modal(val) {
  modal = val;
}

const form_inputs = [
  { type: "text", title: "Descripcion", name: "descripcion", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z0-9\\\s])*",
    title: "Solo Letras, numeros y espacios",
    maxLegth: 255,
  }},

  { type: "text", title: "Codigo", name: "codigo", size: 6, validate: {
    required: '',
    pattern: "([a-zA-Z])*",
    title: "Solo Letras",
    maxLegth: 7,
  }},
];

async function render_table() {
  clean($root);
  let $table = new TableComponent({
    columns: "Descripcion,Codigo",
    attrs: "descripcion,codigo",
    title: title,
    base_url: api_url,
    edit: true,
  });

  // clean($root);
	$root.appendChild($table);
	await $table.render();
  $table.$create_button.addEventListener('click', function(e) {
    if(!modal){
      render_form($table, true);
      open_modal(true);
    }
  });
  $table.edit_action = function(){
    return render_form($table);
  };

  return $table;
}

function render_form($table, create=false) {
  let $form = new SCSFormModal({
    title: "Unidad de Medida",
    url: api_url
  });

  for(let inp of form_inputs) {
    let input = InputFactory(inp.type).create(inp);
    $form.add_input(input);
  }

  $root.append($form);

  $form.$cancel.addEventListener('click', function(e){
    open_modal(false);
  });
  $form.add_post_submit_callback(async function(){
    $form.remove();
    open_modal(false);
    await $table.refresh();
  });

  let $descripcion = $form.querySelector('[name=descripcion]');
  let $codigo = $form.querySelector('[name=codigo]');
  
  if(create) {
    $descripcion.addEventListener('blur', function(e){
      let abbrev = e.target.value.split('').filter(function(cur, idx, src) {
        return idx % 2 == 0;
      }).join('').replace(/[aeiou\s]/gi, '').toUpperCase();
      
      $codigo.value = abbrev;
    });
  }

  return $form;
}

window.onload = async function() {
  var $table = await render_table();
}
