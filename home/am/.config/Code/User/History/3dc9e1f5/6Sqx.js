import { $create } from "../libs/utils";
import { SCSInput } from "./scs-input";
import { SCSSelectSearch } from "./scs-select-search";
import { SCSNotification } from "./scs-notification";
import { SCSInputHidden } from "./scs-input-hidden";
import { SCSButton } from "./scs-button";
import { SCSTextArea } from "./scs-textarea";

/*
TODO:
- Decirle a backend para finalzar submit de guardado
- Cargar data para editar

*/

export class SCSDetalle extends HTMLElement {
  constructor(opts){
    super();

    this.innerHTML = `
    <div class="col-md-6 detalles__select__container">
    </div>
    <div class="detalles__container">
    </div>
    <div class="invalid-feedback"></div>
    `;

    this.url_articulo =  '/api/compras/articulo';
    this.url_unidad_medida =  '/api/compras/unidad-medida';
    this.classList.add('col-md-12')
    this.opts = opts;
    this.$detalles = this.querySelector('.detalles');
    this.$select_container = this.querySelector('.detalles__select__container');
    this.$container = this.querySelector('.detalles__container');
		this.$invalid = this.querySelector('.invalid-feedback');

    // this.observer = new MutationObserver(function(){
    //   this.validate();
    // }.bind(this)).observe(this.$container, {childList: true});

    this.type_action = {
      'BIENES': function() {
        this.$select = new SCSSelectSearch({
          type: "select_search", title: "Detalles", size: 6, url: this.url_articulo, value: 'id',
          label: ['codigo','descripcion']
        });
        this.$select_container.append(this.$select);
        this.$select.$select.addEventListener('change', async function (e) {
          // await this.add_detalle_bienes();
          this.add_detalle[this.opts.type]();
        }.bind(this));
      }.bind(this),

      'SERVICIOS': function() {
        this.$detalles_button = new SCSButton({title: 'Agregar Detalle'});
        this.$detalles_button.setAttribute('is', 'scs-button');
        this.$detalles_button.classList.add('mb-4');
        this.$detalles_button.addEventListener('click', function(e){
          e.preventDefault();
          // this.add_detalle_servicios();
          this.add_detalle[this.opts.type]();
        }.bind(this));
        this.$select_container.append(this.$detalles_button);
      }.bind(this),
    }

    this.add_detalle = {
      'BIENES': function(opts){
        this.add_detalle_bienes(opts)
      }.bind(this),
      'SERVICIOS': function(opts){
        this.add_detalle_servicios(opts)
      }.bind(this)
    }

    this.type_action[this.opts.type]();
  }

  add_detalle_servicios(opts){
    let $detalle = this.create_detalle_servicios(opts);
    this.$container.append($detalle);
  }

  async add_detalle_bienes(opts){
    let id = this.$select.value;
    this.$select.render();
    let $values = this.$container.querySelectorAll('input[type=hidden]');
    for(let $val of $values){
      if($val.value === id){
        this.append(new SCSNotification({ data: ["Elemento duplicado, por favor elija otro"] }));
        return;
      }
    }
    let $detalle = (await this.create_detalle_bienes(id, opts));
    this.$container.append($detalle);
  }

  create_detalle_servicios(opts) {
    let $div = $create('div');
    $div.classList.add('d-flex', 'align-items-center');

    let $descripcion = new SCSTextArea({
      type: "text", size: 6, height: 3, placeholder: "Descripcion de detalle"
    });
    $descripcion.$input.addEventListener('input', function(e){
      e.target.value = e.target.value.toUpperCase();
    });
    let $um = new SCSSelectSearch({
      type: "select_search", size: 3, url: this.url_unidad_medida, value: 'id',
      label: ['codigo','descripcion']
    });
    $um.$search.addEventListener('input', function(e){
      e.target.value = e.target.value.toUpperCase();
    });
    let $cant = new SCSInput({ type: "number", size: 2, placeholder: "Cant" });

    let $button = $create('button');
    $button.classList.add('btn','btn-danger','btn-sm','font-weight-bold', 'mb-4');
    $button.textContent = "X";
    $button.addEventListener('click', function(e){
      $div.remove();
    })

    $div.$descripcion = $descripcion;
    $div.append($div.$descripcion);
    $div.$um = $um;
    $div.append($div.$um);
    $div.$cant = $cant;
    $div.append($div.$cant);
    $div.append($button);

    if(opts){
      $div.$descripcion.$input.value = opts?.descripcion;
      $div.$um.init_value(opts?.unidad_medida_id);
      $div.$cant.$input.value = opts?.cantidad;
    }

    return $div;
  }

  async create_detalle_bienes(art_id, opts) {
    let id = art_id || opts.articulo_id;
    // let data = await fetch(`${this.url_articulo}/?id=${id}`).then(res => res.json());
    let data = await axios(`${this.url_articulo}/?id=${id}`).then(res => res.data);
    console.log(data)
    let $div = $create('div');

    $div.classList.add('d-flex', 'align-items-center');

    let $cant = new SCSInput({ type: "number", size: 2, placeholder: "Cant" });
    let $articulo = new SCSInput({ type: "text", size: 3, placeholder: "Articulo" });
    let $codigo = new SCSInput({ type: "text", size: 3, placeholder: "Codigo" });
    let $um = new SCSInput({ type: "text", size: 3, placeholder: "Unidad Medida" });
    let $articulo_id = new SCSInputHidden({type: "hidden"});
    let $um_id = new SCSInputHidden({type: "hidden"});

    $articulo.$input.setAttribute('readonly', '');
    $articulo.$input.value = data.descripcion;
    $codigo.$input.setAttribute('readonly', '');
    $codigo.$input.value = data.codigo;
    $um.$input.setAttribute('readonly', '');
    $um.$input.value = data.unidad_medida;
    // $value.$input.value = id;
    $articulo_id.$input.value = id;
    $um_id.$input.value = data.unidad_medida_id;

    let $button = $create('button');
    $button.classList.add('btn','btn-danger','btn-sm','font-weight-bold', 'mb-4');
    $button.textContent = "X";
    $button.addEventListener('click', function(e){
      $div.remove();
    })

    $div.$codigo = $codigo;    
    $div.append($div.$codigo);
    $div.$articulo = $articulo;
    $div.append($div.$articulo);
    $div.$um = $um;
    $div.append($div.$um);
    $div.$cant = $cant;
    $div.append($div.$cant);
    $div.append($button);
    // $div.$value = $value;
    // $div.append($div.$value);
    $div.$um_id = $um_id;
    $div.append($div.$um_id);
    $div.$articulo_id = $articulo_id;
    $div.append($div.$articulo_id);

    if(opts){
      $div.$cant.$input.value = opts?.cantidad;
      $div.$codigo.$input.value = opts?.codigo;
      $div.$articulo.init_value(opts?.articulo_id);
      $div.$um.init_value(opts?.unidad_medida_id);
    }

    return $div;
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
        articulo_id: inp.$articulo_id?.$input?.value || ''
      }
      this.data.push(data);
    }
    return this.data;
  }

}

customElements.define('scs-detalle', SCSDetalle);