import { TableComponent } from "../components/scs-table.js";
import { SCSForm } from "../components/scs-form.js";
import { SCSInput } from "../components/scs-input.js";
import { SCSSelect } from '../components/scs-select.js';
import { SCSInputPrice } from "../components/scs-input-price.js";
import { SCSSelectSearch } from "../components/scs-select-search.js";
import { $, $qs, get_quarter, crudder } from "../libs/utils.js";
import { SCSTextArea } from "../components/scs-textarea.js";
import { SCSDropdown } from "../components/scs-dropdown.js";
import { SCSInputHidden } from "../components/scs-input-hidden.js";
import { SCSNotification } from "../components/scs-notification.js";
import { SCSDetalle } from "../components/scs-detalle.js";

/*
TODO:
- Terminar submit

*/

class SCSFormRequisicion extends SCSForm {
  constructor(opts) {
    super(opts);
  }

  check_inputs_value(selector) {
    let data = {};
    for (let inp of this.$inputs) {
      let result = inp.validate();
      if (!result.validate) {
        inp.show_validation_error();
        this.ready = false;
      }

      let $internal_input = $qs(inp, 'input[name], select[name], textarea[name]');

      if (!$internal_input) continue;

      if ($internal_input.value !== '' && $internal_input.name !== '') {
        data = { ...data, [$internal_input.name]: $internal_input.value }
      }
    }
    data = {
      ...data,
      detalles: this.$form_body.lastChild.get_data(),
      detalles_delete: this.$form_body.lastChild.delete_data
    }
    // this.data = this.check_inputs_value('input[name], select[name], textarea[name]');
    return data;
  }

	async load_to_edit(uuid) {
		this.edit_uuid = uuid;
		await this.load_data_to_edit(uuid);

		if(this.edit_data) {
      let $detalles = new SCSDetalle({
        type: this.edit_data.requisicion.tipo
      });
      this.add_input($detalles);
      console.log('edit data', this.edit_data)

			for(let [key, val] of Object.entries(this.edit_data.requisicion)) {
				let inp = $qs(this,`input[name=${key}],select[name=${key}],textarea[name=${key}]`);
				if(inp && val){
          try {
            this.load_input_value()[inp.type](inp, val);
          } catch {
            this.load_input_value()["default"](inp, val);
          }
				} 
			}

      for(let det of this.edit_data.detalles){
        $detalles.add_detalle[this.edit_data.requisicion.tipo](det);
      }
		}
	}
}
customElements.define('scs-form-requisicion', SCSFormRequisicion);

let $root = $('.card-body');
let api_url = 'api/compras/requisicion';
let form_type = '';

let page_title = document.title;
let title = "Requisicion";

function clean($root) {
  $root.innerHTML = '';
}

let prioridad = [
  {text: "NORMAL"},
  {text: "URGENTE"},
]

// let dependencia_solicitante = await axios(`${basePath}/api/compras/unidad-ejecutora`).then(res => res.data.data);
let dependencia_solicitante = (await crudder(`${basePath}/api/compras/unidad-ejecutora`).get()).data;

const form_inputs = [
  { type: "text", title: "Nro. Requisicion", name: "numero", size: 3 },

  { type: "text", title: "Dependencia Solicitante", name: "dependencia_solicitante", size: 4 },

  // { type: "text", title: "Centro de Costo", name: "codigo_centro_costo", size: 3 },
  { type: "text", title: "Estatus", name: "status", size: 4 },
  { type: "text", title: "Trim.", name: "trimestre", size: 1 },


  { type: "date", title: "Fecha Requisicion", name: "fecha", size: 3, validate: {
    required: ''
  }},


  { type: "select_search", title: "Linea", name: "codigo_linea_servicio", size: 3, url: 'api/compras/linea', value: 'id',
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
];

async function render_table() {
  clean($root);
  let $table = new TableComponent({
    columns: "Unidad Solicitante,Fecha,Estatus",
    attrs: "codigo_dependencia_solicitante,fecha,status",
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

  let form_types = {
    'select': SCSSelect,
    'select_search': SCSSelectSearch,
    'price': SCSInputPrice,
    'textarea': SCSTextArea,
    'default': SCSInput,
    'hidden': SCSInputHidden,
  }

  for(let inp of form_inputs) {
    let input = form_types[inp.type] || form_types['default'];
    $form.add_input(new input(inp));
  }

  if(create){
    let $detalles = new SCSDetalle({
      type: form_type
    });
    $form.add_input($detalles);
  }

  $qs($form, '[name=tipo]').value = type || '';
  let $numero = $qs($form,'[name=numero]');
  let $dependencia_solicitante = $qs($form,'[name=dependencia_solicitante]');
  let $codigo_dependencia_solicitante = $qs($form,'[name=codigo_dependencia_solicitante]');
  // let $codigo_centro_costo = $qs($form,'[name=codigo_centro_costo]');
  let $status = $qs($form,'[name=status]');
  let $fecha_requisicion = $qs($form,'[name=fecha]');
  let $trimestre = $qs($form,'[name=trimestre]');

  $numero.setAttribute('readonly', '');
  $dependencia_solicitante.setAttribute('readonly', '');
  $codigo_dependencia_solicitante.value = dependencia_solicitante.cod_unidad_ejecutora;
  $dependencia_solicitante.value = `${dependencia_solicitante.cod_unidad_ejecutora} - ${dependencia_solicitante.unidad_ejecutora}`;
  // $codigo_centro_costo.setAttribute('readonly', '');
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

