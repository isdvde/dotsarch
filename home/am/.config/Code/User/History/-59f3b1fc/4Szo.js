import { TableComponent } from "../components/scs-table.js";
import { SCSForm } from "../components/scs-form.js";
import { $, $qs, get_quarter, crudder } from "../../libs/utils.js";
import { SCSDropdown } from "../components/scs-dropdown.js";
// import { SCSDetalle } from "../components/scs-detalle.js";
import { SCSDetalleFactory } from "../../libs/factories/scs-detalle-factory.js";
import { InputFactory } from "../libs/factories/input-factory.js";
import { SCSRequisicionBase } from "./scs-requisicion-base.js";

export class SCSRequisicion extends SCSRequisicionBase{
  constructor(opts){
    super(opts);
  }
}

let requisicion = new SCSRequisicion({

  api_url: 'api/compras/requisicion',

  title: "Requisicion",

  form_inputs: [

    { type: "text", title: "Nro. Requisicion", name: "numero", size: 3 },
    { type: "text", title: "Estatus", name: "status", size: 4 },
    { type: "date", title: "Fecha Requisicion", name: "fecha", size: 4, validate: {
      required: ''
    }},
    { type: "text", title: "Trim.", name: "trimestre", size: 1 },


    { type: "text", title: "Dependencia Solicitante", name: "dependencia_solicitante", size: 12 },
    { type: "select_search", title: "Linea", name: "codigo_linea_servicio", size: 6, url: 'api/compras/linea', value: 'id',
      label: ['descripcion'], required: true
    },
    

    { type: "select", title: "Prioridad", name: "prioridad", size: 3, options: {
      text: 'text',
      value: 'text',
      data: prioridad
    }},
    { type: "date", title: "Fecha Recepcion", name: "fecha_recepcion", size: 3},


    { type: "textarea", title: "Justificacion", name: "justificacion", height: 4, size: 12, validate: {
      required: '',
      pattern: "([a-zA-Z\\\s])*",
      title: "Solo Letras y espacios",
    }},


    { type: "hidden", name: "codigo_dependencia_solicitante" },
    { type: "hidden", name: "tipo" },
  ],
  columns: "Número,Unidad Solicitante,Fecha,Estatus",
  attrs: "numero,codigo_dependencia_solicitante,fecha,status",
});




async function render_table() {
  clean($root);
  let $table = new TableComponent({
    title: title,
    base_url: api_url,
    edit: true,
  });

 let $dropdown_create = new SCSDropdown({ title: "Agregar" });

  $dropdown_create.add_item({
    title: 'Servicios',
    callback: function() {
      form_type = 'SERVICIOS';
      render_form($table, 'SERVICIOS', true);
    }
  });

  $dropdown_create.add_item({
    title: 'Bienes',
    callback: function() {
      form_type = 'BIENES';
      render_form($table, 'BIENES', true);
    }
  });

  $table.$button_container.innerHTML = '';
  $table.$button_container.append($dropdown_create);

  clean($root);
	$root.append($table);
	await $table.render();
  $table.edit_action = function(){
    return render_form($table);
  }

  return $table;
}

function render_form($table, type, create=false) {
  clean($root);
  let $form = new SCSFormRequisicion({
    title: "Detalles de Requisicion",
    url: api_url,
  });

  for(let inp of form_inputs) {
    let input = InputFactory(inp.type).create(inp);
    $form.add_input(input);
  }

  if(create){
    // let $detalles = new SCSDetalle({
    let $detalles = SCSDetalleFactory(form_type).create();
    $form.add_input($detalles);
  }

  let $detalles = $qs($form, 'scs-detalle');
  $detalles.style.display = "none";

  let $linea = $qs($form, '[name="codigo_linea_servicio"]');
  let $linea_search = $qs($linea.parentElement, 'input[srch]') 
  new MutationObserver(function(){
    if($linea_search.value) {
      $detalles.style.display = "";
      return;
    }
    $detalles.style.display = "none";
    $detalles.clean_detalles();
  }).observe($linea_search, {childList: true, attributes: true});

  $qs($form, '[name=tipo]').value = type || '';
  let $numero = $qs($form,'[name=numero]');
  let $dependencia_solicitante = $qs($form,'[name=dependencia_solicitante]');
  let $codigo_dependencia_solicitante = $qs($form,'[name=codigo_dependencia_solicitante]');
  let $status = $qs($form,'[name=status]');
  let $fecha_requisicion = $qs($form,'[name=fecha]');
  let $trimestre = $qs($form,'[name=trimestre]');

  $numero.setAttribute('readonly', '');
  $dependencia_solicitante.setAttribute('readonly', '');
  $codigo_dependencia_solicitante.value = dependencia_solicitante.codigo_unidad_ejecutora;
  $dependencia_solicitante.value = `${dependencia_solicitante.codigo_unidad_ejecutora} - ${dependencia_solicitante.unidad_ejecutora}`;
  $status.setAttribute('readonly', '');
  $trimestre.setAttribute('readonly', '');

  if(create){ $status.value = "TRANSCRITO"; }

  $fecha_requisicion.addEventListener('change', function(e) {
    if($fecha_requisicion.value !== ''){
      $trimestre.value = get_quarter($fecha_requisicion.value);
      return;
    }
    $trimestre.value = '';
  });

  clean($root);
  $root.append($form);
  $form.$cancel.addEventListener('click', render_table);
  $form.add_post_submit_callback(render_table);
  return $form;
}

await render_table();

