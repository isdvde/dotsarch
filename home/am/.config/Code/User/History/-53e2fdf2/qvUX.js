import { $create, $qsa, crudder } from "../libs/utils";
import { InputFactory } from "../libs/factories/input-factory";

class SCSDetalleBienes extends SCSDetalle {
  constructor(opts){
    super(opts);
    this.url_articulo =  'api/compras/articulo';

    this.$select = new InputFactory('select_search').create({
      type: "select_search", title: "Detalles", size: 6, url: this.url_articulo, value: 'id',
      label: ['codigo','descripcion']
    });
    this.$select_container.append(this.$select);
    this.$select.$select.addEventListener('change', async function (e) {
      this.add_detalle[this.opts.type]();
    }.bind(this));
  }

  check_value(id, $values) {
    for(let $val of $values){
      if($val.$input.value === id){
        this.append(new SCSNotification({ data: ["Elemento duplicado, por favor elija otro"] }));
        return false;
      }
    }
    return true;
  }

  async add_detalle(opts){
    let id = this.$select.value;
    this.$select.render();
    let $values = $qsa(this.$container, '[art_id]');
    this.check_value
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

  async create_detalle(art_id, opts) {
    let id = art_id || opts.articulo_id;
    let url = new URL(`${basePath}/${this.url_articulo}`);
    url.searchParams.append('id', id);

    let data = (await crudder(url.href).get()).data.shift();
    let $div = $create('div');

    $div.classList.add('d-flex', 'align-items-center');

    let $cant =        new InputFactory().create({ type: "number", size: 2, placeholder: "Cant" });
    let $articulo =    new InputFactory().create({ type: "text", size: 3, placeholder: "Articulo" });
    let $codigo =      new InputFactory().create({ type: "text", size: 3, placeholder: "Codigo" });
    let $um =          new InputFactory().create({ type: "text", size: 3, placeholder: "Unidad Medida" });
    let $articulo_id = new InputFactory('hidden').create({type: "hidden"});
    let $um_id =       new InputFactory('hidden').create({type: "hidden"});
    let $linea_id =    new InputFactory('hidden').create({type: "hidden"});
    let $uuid =        new InputFactory('hidden').create({type: "hidden"});

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

  validate() {
    super.validate();
    this.show_validation_error();
    return this.validation;
  }
}