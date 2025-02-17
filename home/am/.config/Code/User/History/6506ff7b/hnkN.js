import { $create, $qs, $qsa, alerter, crudder } from "../libs/utils";
import { SCSInput } from "./scs-input";
import { SCSSelectSearch } from "./scs-select-search";
import { SCSNotification } from "./scs-notification";
import { SCSInputHidden } from "./scs-input-hidden";
import { SCSButton } from "./scs-button";
import { SCSTextArea } from "./scs-textarea";

export class SCSDetalle extends HTMLElement {
  constructor(opts){
    super();

    this.innerHTML = `
    <div class="col-md-6 detalles__select__container"></div>
    <div class="detalles__container"></div>
    <div class="invalid-feedback"></div>
    `;

    this.url = '';
    this.url_unidad_medida =  'api/compras/unidad-medida';
    this.url_centro_costo =  'api/compras/centros-costos';
    this.linea = '';
    this.delete_data = [];
    this.classList.add('col-md-12')
    this.opts = opts;
    this.$detalles = $qs(this, '.detalles');
    this.$select_container = $qs(this,'.detalles__select__container');
    this.$container = $qs(this,'.detalles__container');
		this.$invalid = $qs(this,'.invalid-feedback');

    this.type_action = {

      'SERVICIOS': function() {
        this.$detalles_button = new SCSButton({title: 'Agregar Detalle'});
        this.$detalles_button.setAttribute('is', 'scs-button');
        this.$detalles_button.classList.add('mb-4');
        this.$detalles_button.addEventListener('click', function(e){
          e.preventDefault();
          this.add_detalle[this.opts.type]();
        }.bind(this));
        this.$select_container.append(this.$detalles_button);
      }.bind(this),
    }
  }

  add_detalle_servicios(opts){
    let $detalle = this.create_detalle_servicios(opts);
    this.$container.append($detalle);
  }


  create_detalle_servicios(opts) {
    let $div = $create('div');
    // $div.classList.add('d-flex', 'align-items-center');
    $div.classList.add('d-flex', 'flex-wrap', 'align-items-center');
    $div.style.borderTop = "1px solid #ebecec"
    $div.style.paddingTop = "1rem"
    let $hr = $create('hr');

    let $descripcion = new SCSTextArea({
      type: "text", size: 12, height: 3, placeholder: "Descripcion de detalle"
    });
    $descripcion.$input.addEventListener('input', function(e){
      e.target.value = e.target.value.toUpperCase();
    });
    let $um = new SCSSelectSearch({
      type: "select_search", size: 4, url: this.url_unidad_medida, value: 'id',
      label: ['codigo','descripcion'], placeholder: "Unidad Medida"
    });
    $um.$search.addEventListener('input', function(e){
      e.target.value = e.target.value.toUpperCase();
    });

    let $centro_costo = new SCSSelectSearch({
      type: "select_search", size: 5, url: this.url_centro_costo, value: 'id',
      label: ['centro_costo'], placeholder: "Centro Costo"
    });
    $centro_costo.$search.addEventListener('input', function(e){
      e.target.value = e.target.value.toUpperCase();
    });

    let $cant = new SCSInput({ type: "number", size: 2, placeholder: "Cant" });
    let $uuid = new SCSInputHidden({type: "hidden"});

    let $button = $create('button');
    $button.classList.add('btn','btn-danger','btn-sm','font-weight-bold', 'mb-4');
    $button.textContent = "X";
    $button.addEventListener('click', function(e){
      e.preventDefault();
      this.delete_detalle(e, $div);
    }.bind(this));

    Object.entries({
      $descripcion: $descripcion,
      $um: $um,
      $cant: $cant,
      $uuid: $uuid
    }).forEach(function([key, val]) {
      this.set_internal_value($div, key, val);
    }.bind(this));

    $div.append($hr);
    $div.$descripcion = $descripcion;
    $div.append($div.$descripcion);
    $div.$um = $um;
    $div.append($div.$um);
    $div.$centro_costo = $centro_costo;
    $div.append($div.$centro_costo);
    $div.$cant = $cant;
    $div.append($div.$cant);
    $div.$uuid = $uuid;
    $div.append($div.$uuid);
    $div.append($button);

    if(opts){
      $div.$descripcion.$input.value = opts?.descripcion;
      $div.$um.init_value(opts?.unidad_medida_id);
      $div.$cant.$input.value = opts?.cantidad;
      $div.$uuid.$input.value = opts?.uuid;
    }

    return $div;
  }

  async create_detalle_bienes(art_id, opts) {
    let id = art_id || opts.articulo_id;
    let url = new URL(`${basePath}/${this.url_articulo}`);
    url.searchParams.append('id', id);

    let data = (await crudder(url.href).get()).data.shift();
    let $div = $create('div');

    $div.classList.add('d-flex', 'align-items-center');

    let $cant = new SCSInput({ type: "number", size: 2, placeholder: "Cant" });
    let $articulo = new SCSInput({ type: "text", size: 3, placeholder: "Articulo" });
    let $codigo = new SCSInput({ type: "text", size: 3, placeholder: "Codigo" });
    let $um = new SCSInput({ type: "text", size: 3, placeholder: "Unidad Medida" });
    let $articulo_id = new SCSInputHidden({type: "hidden"});
    let $um_id = new SCSInputHidden({type: "hidden"});
    let $linea_id = new SCSInputHidden({type: "hidden"});
    let $uuid = new SCSInputHidden({type: "hidden"});

    $articulo.$input.setAttribute('readonly', '');
    $articulo.$input.value = data.descripcion;
    $codigo.$input.setAttribute('readonly', '');
    $codigo.$input.value = data.codigo;
    $um.$input.setAttribute('readonly', '');
    $um.$input.value = data.unidad_medida;
    // $value.$input.value = id;
    $articulo_id.$input.value = id;
    $articulo_id.setAttribute('art_id', '');
    $linea_id.setAttribute('linea_id', '');
    $um_id.$input.value = data.unidad_medida_id;
    $linea_id.$input.value = data.linea_id;

    let $button = $create('button');
    $button.classList.add('btn','btn-danger','btn-sm','font-weight-bold', 'mb-4');
    $button.textContent = "X";
    $button.addEventListener('click', function(e){
      e.preventDefault();
      this.delete_detalle(e, $div)
    }.bind(this));

    Object.entries({
      $codigo: $codigo,
      $articulo: $articulo,
      $um: $um,
      $cant: $cant,
      $um_id: $um_id,
      $articulo_id: $articulo_id,
      $linea_id: $linea_id,
      $uuid: $uuid,
    }).forEach(function ([key, val]) {
      this.set_internal_value($div, key, val);
    }.bind(this));

    $div.append($button);

    if(opts){
      $div.$cant.$input.value = opts.cantidad;
      $div.$codigo.$input.value = data.codigo;
      $div.$articulo.$input.value = data.descripcion;
      $div.$um.$input.value = data.unidad_medida;
      $div.$articulo_id.$input.value = data.id;
      $div.$um_id.$input.value = opts.unidad_medida_id;
      $div.$linea_id.$input.value = opts.linea_id;
      $div.$uuid.$input.value = opts.uuid;
    }

    return $div;
  }

  delete_detalle(e, $div) {
    let uuid = e.target.closest('div').$uuid.$input.value;
    if (!uuid) { $div.remove(); return; }

    let confirm = alerter('Desea eliminar este elemento?').confirm()
    if (!confirm) { return; }
    this.delete_data.push(uuid);
    $div.remove();
  }

  clean_detalles() {
    this.$container.textContent = "";
  }

  set_internal_value($div, attr, val) {
    $div[attr] = val;
    $div.append($div[attr]);
  }

	validate() {
    this.validation = {
      validate: true,
      message: ''
    }

		if(this.$container.childElementCount === 0) {
			this.validation = {
				validate: false,
				message: 'Debe agregar un detalle'
			}
      this.show_validation_error();
      return this.validation;
		} 

    for(let children of this.$container.children){
      if(!children.$cant.$input.value){
        this.validation = {
          validate: false,
          message: 'Debe rellenar la cantidad'
        }
        this.show_validation_error();
        return this.validation;
      }
    }

    if(this.opts.type === 'SERVICIOS'){
      for(let children of this.$container.children){
        if(!children.$descripcion.$input.value){
          this.validation = {
            validate: false,
            message: 'Debe rellenar el detalle'
          }
          this.show_validation_error();
          return this.validation;
        }

        if(!children.$um.value){
          this.validation = {
            validate: false,
            message: 'Debe seleccionar unidad de medida'
          }
          this.show_validation_error();
          return this.validation;
        }
      }
    }

    this.show_validation_error();
    return this.validation;
	}

	show_validation_error() {
		if(!this.validation.validate) {
			this.$invalid.textContent = this.validation.message || '';
			this.$invalid.style.display = 'block';
			this.scrollIntoView();
			return this;
		}
		this.$invalid.style.display = "none";
		return this;
	}

  get_data(){
    this.data = [];
    for(let inp of this.$container.children){
        let data = {
          descripcion: inp.$descripcion?.$input?.value || '',
          cantidad: inp.$cant?.$input?.value || '',
          unidad_medida_id: inp.$um_id?.$input?.value || inp.$um?.$value?.value || '',
          articulo_id: inp.$articulo_id?.$input?.value || '',
          uuid: inp.$uuid?.$input?.value || ''
        }
        this.data.push(data);
      }
    return this.data;
  }

}

customElements.define('scs-detalle', SCSDetalle);

class SCSDetalleBienes extends SCSDetalle {
  constructor(opts){
    super(opts);
    this.url_articulo =  'api/compras/articulo';

    this.$select = new SCSSelectSearch({
      type: "select_search", title: "Detalles", size: 6, url: this.url_articulo, value: 'id',
      label: ['codigo','descripcion']
    });
    this.$select_container.append(this.$select);
    this.$select.$select.addEventListener('change', async function (e) {
      this.add_detalle[this.opts.type]();
    }.bind(this));

  }


  async add_detalle(opts){
    let id = this.$select.value;
    this.$select.render();
    let $values = $qsa(this.$container, '[art_id]');
    for(let $val of $values){
      if($val.$input.value === id){
        this.append(new SCSNotification({ data: ["Elemento duplicado, por favor elija otro"] }));
        return;
      }
    }
    let $detalle = (await this.create_detalle_bienes(id, opts));
    this.$container.append($detalle);
    this.linea = this.$container.firstChild?.$linea_id?.$input?.value || '';
    let url = new URL(`${basePath}/${this.url_articulo}`);
    if(this.linea) {
      url.searchParams.append('linea_id', this.linea);
      this.$select.url = url;
    } else {
      this.$select.opts.url = new URL(`${basePath}/${this.url_articulo}`)
    }
  }
}