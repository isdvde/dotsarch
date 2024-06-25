import { TableComponent } from "../components/scs-table.js";
import { SCSForm } from "../components/scs-form.js";
import { SCSInput } from "../components/scs-input.js";
import { SCSSelect } from '../components/scs-select.js';
import { SCSInputPrice } from "../components/scs-input-price.js";
import { SCSSelectSearch } from "../components/scs-select-search.js";
import { $, get_quarter } from "../libs/utils.js";
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

	async submit(e) {
		this.ready = true;
		e.preventDefault();
		for(let inp of this.$inputs) {
			let $internal_input = inp.querySelector('input[name]')
      || inp.querySelector('select[name]')
      || inp.querySelector('textarea[name]');
      let result = inp.validate();
      if(!result.validate) {
        inp.show_validation_error();
        this.ready = false;
      }

      if($internal_input){
        if($internal_input.name !== '' && $internal_input.value !== ''){
          this.data = {...this.data, [$internal_input.name]: $internal_input.value }
        }
      } 
		}

    this.data = { ...this.data, detalles: this.$form_body.lastChild.get_data() }

    console.log(this.data)
		if(!this.ready) return;
		let method = this.edit_uuid ? 'PUT' : 'POST'; 
		let url = this.edit_uuid ? `${this.url}/${this.edit_uuid}` : this.url;
		let action = this.edit_uuid ? "editado" : "agregado";
		try {
			if (this.data) {
				let options = {
					method: method,
          url: url,
					body: {...this.data, uuid: this.edit_uuid},
				};
				// let res = await fetch(url, options).then((res) => {
				let res = await axios(options).then(res => res.data).catch(res => res.response.data);
				if(res.status === 'error'){
					console.error(res);
					let $notification = new SCSNotification({
						data: res.data
					})
					this.append($notification);
					return;
				} else {
					window.alert(`Elemento ${action} correctamente`);
				}
			} 
		} catch (e) {
			console.error(e);
		}

		for(let f of this.callbacks){
			f();
		}
	}
}
customElements.define('scs-form-requisicion', SCSFormRequisicion);

let $root = $('.card-body');
let api_url = '/api/compras/requisicion';

let page_title = document.title;
let title = "Requisicion";

function clean($root) {
  $root.innerHTML = '';
}

let prioridad = [
  {text: "NORMAL"},
  {text: "URGENTE"},
]


const form_inputs = [
  { type: "text", title: "Nro. Requisicion", name: "numero", size: 3 },

  { type: "text", title: "Dependencia Solicitante", name: "dependencia_solicitante", size: 4 },

  // { type: "text", title: "Centro de Costo", name: "codigo_centro_costo", size: 3 },
  { type: "text", title: "Estatus", name: "status", size: 4 },
  { type: "text", title: "Trim.", name: "trimestre", size: 1 },


  { type: "date", title: "Fecha Requisicion", name: "fecha", size: 3, validate: {
    required: ''
  }},


  { type: "select_search", title: "Linea", name: "codigo_linea_servicio", size: 3, url: '/api/compras/linea', value: 'id',
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

  { type: "hidden", name: "codigo_unidad_solicitante" },
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

 let $dropdown_create = new SCSDropdown({
    title: "Agregar"
  });

  $dropdown_create.add_item({
    title: 'Servicios',
    callback: function() {
      render_form($table, 'SERVICIOS', true);
    }
  });

  $dropdown_create.add_item({
    title: 'Bienes',
    callback: function() {
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

  let $detalles = new SCSDetalle({
    type: type
  });
  $form.add_input($detalles);

  $form.querySelector('[name=tipo]').value = type || '';
  let $numero = $form.querySelector('[name=numero]');
  let $codigo_dependencia_solicitante = $form.querySelector('[name=dependencia_solicitante]');
  // let $codigo_centro_costo = $form.querySelector('[name=codigo_centro_costo]');
  let $status = $form.querySelector('[name=status]');
  let $fecha_requisicion = $form.querySelector('[name=fecha]');
  let $trimestre = $form.querySelector('[name=trimestre]');

  $numero.setAttribute('readonly', '');
  $codigo_dependencia_solicitante.setAttribute('readonly', '');
  $codigo_dependencia_solicitante.value = codigo_dependencia_solicitante;
  // $codigo_centro_costo.setAttribute('readonly', '');
  $status.setAttribute('readonly', '');
  $trimestre.setAttribute('readonly', '');

  if(create){
    $status.value = "TRANSCRITO";
  }

  // $fecha_requisicion.addEventListener('change', function(e){
  //   if($fecha_requisicion.value !== ''){
  //     $trimestre.value = get_quarter($fecha_requisicion.value);
  //     return;
  //   }
  //   $trimestre.value = '';
  // });

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

window.onload = async function(){
  await render_table();

  let codigo_dependencia_solicitante = await axios('/api/compras/unidad-ejecutora').then(res => res.data.data);
  console.log(codigo_dependencia_solicitante);
}
// render_form();

