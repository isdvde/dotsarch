import { $create } from "../libs/utils";
import { SCSInputFactory } from "../libs/factories/scs-input-factory";
import { SCSDetalle } from "./scs-detalle-base";
import { SCSButton } from "./scs-button";

export class SCSDetalleServicios extends SCSDetalle {

  constructor(opts){
    super(opts);

    this.url_unidad_medida =  'api/compras/unidad-medida';
    this.url_centro_costo =  'api/compras/centros-costos';

    this.opts = opts;

    this.$detalles_button = new SCSButton({title: 'Agregar Detalle'});
    this.$detalles_button.setAttribute('is', 'scs-button');
    this.$detalles_button.classList.add('mb-4');
    this.$detalles_button.addEventListener('click', function(e){
      e.preventDefault();
      // this.add_detalle[this.opts.type]();
      this.add_detalle();
    }.bind(this));
    this.$select_container.append(this.$detalles_button);
  }

  add_detalle(opts){
    let $detalle = this.create_detalle(opts);
    this.$container.append($detalle);
  }

  create_detalle(opts) {
    let $div = $create('div');
    $div.classList.add('d-flex', 'flex-wrap', 'align-items-center');
    $div.style.borderTop = "1px solid #ebecec"
    $div.style.paddingTop = "1rem"
    let $hr = $create('hr');

    let $descripcion = SCSInputFactory('textarea').create({
      type: "text", size: 12, height: 3, placeholder: "Descripcion de detalle"
    });
    $descripcion.$input.addEventListener('input', function(e){
      e.target.value = e.target.value.toUpperCase();
    });
    let $um = SCSInputFactory('select_search').create({
      type: "select_search", size: 4, url: this.url_unidad_medida, value: 'id',
      label: ['codigo','descripcion'], placeholder: "Unidad Medida"
    });
    $um.$search.addEventListener('input', function(e){
      e.target.value = e.target.value.toUpperCase();
    });

    let $centro_costo = SCSInputFactory('select_search').create({
      type: "select_search", size: 5, url: this.url_centro_costo, value: 'id',
      label: ['centro_costo'], placeholder: "Centro Costo"
    });
    $centro_costo.$search.addEventListener('input', function(e){
      e.target.value = e.target.value.toUpperCase();
    });

    let $cant = SCSInputFactory('default').create({ type: "number", size: 2, placeholder: "Cant" });
    let $uuid = SCSInputFactory('hidden').create({type: "hidden"});

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


    if(this.opts.solicitud){
      $div.$centro_costo.remove();
      // $div.$um.
    } 

    if(opts){
      $div.$descripcion.$input.value = opts?.descripcion;
      $div.$um.init_value(opts?.unidad_medida_id);
      $div.$cant.$input.value = opts?.cantidad;
      $div.$uuid.$input.value = opts?.uuid;
    }

    return $div;
  }

  validate() {
    super.validate();

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

    this.show_validation_error();
    return this.validation;
  }
}

customElements.define('scs-detalle-servicios', SCSDetalleServicios);