import { $qs, $qa, alerter } from "../libs/utils";

export class SCSDetalle extends HTMLElement {
  
  constructor(opts){
    super();
    // if (this.constructor == BaseModule) throw new Error("Abstract classes can't be instantiated.");
    // if(!opts) throw new Error("No han sido definidos los parametros de construccion") 

    this.innerHTML = `
    <div class="col-md-6 detalles__select__container"></div>
    <div class="detalles__container"></div>
    <div class="invalid-feedback"></div>
    `;

    this.url = '';
    this.linea = '';
    this.delete_data = [];
    this.classList.add('col-md-12')
    this.opts = opts;
    this.$detalles = $qs(this, '.detalles');
    this.$select_container = $qs(this,'.detalles__select__container');
    this.$container = $qs(this,'.detalles__container');
		this.$invalid = $qs(this,'.invalid-feedback');
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

    // this.show_validation_error();
    // return this.validation;
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

  set_readonly(){
    console.log(this.$container.children)
    let $dets = $qa(this.$container.children, 'scs-input, scs-textarea, scs-select-search, scs-select');

    for(let det of $dets){
      console.log(det)
      det.set_readonly(true);
    }



    // for(let children of this.$container.children.children){
    //   children.set_readonly(true);
    // }
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

// customElements.define("scs-detalle", SCSDetalle);

customElements.define('scs-detalle', SCSDetalle);