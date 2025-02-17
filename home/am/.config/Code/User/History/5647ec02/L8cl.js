// import { TableComponent } from "../components/scs-table.js";
import { SCSTable } from "../components/scs-table.js";
import { SCSForm } from "../components/scs-form.js";
import { $qs, clean } from "../libs/utils.js";
// import { InputFactory } from "../libs/factories/input-factory.js";
import { SCSInputFactory } from "../libs/factories/scs-input-factory.js";
import { BaseModule } from "./abstract-module.js"

class ArticuloModule extends BaseModule {
  constructor(opts) {
    super(opts);
  }

  async render_table() {
    clean(this.$root);
    this.$table = new SCSTable({
      columns: "Codigo,Descripcion,Linea,Unidad de Medida",
      attrs: "codigo,descripcion,linea,unidad_medida",
      title: this.title,
      base_url: this.api_url,
      edit: true,
    });

    clean(this.$root);
    this.$root.append(this.$table);
    await this.$table.render();
    this.$table.$create_button.addEventListener('click', function () {
      this.render_form(true);
    }.bind(this));
    this.$table.edit_action = this.render_form;

    return this.$table;
  }

  render_form(create = false) {
    clean(this.$root);
    this.$form = new SCSForm({
      title: "Descripcion de Articulo",
      url: this.api_url
    });

    console.log(this.form_inputs);

    for (let inp of this.form_inputs) {
      console.log("inptype", inp.type)
      let input = new SCSInputFactory(inp.type).create(inp);
      console.log(input);
      this.$form.add_input(input);
    }

    if (create) {
      $qs(this.$form, 'option[selected]').removeAttribute('selected');
      $qs(this.$form, 'option[value=ACTIVO]').setAttribute('selected', '');
    }

    $qs(this.$form, '[name="codigo"]').setAttribute('readonly', '');

    clean(this.$root);
    $root.append(this.$form);
    this.$form.$cancel.addEventListener('click', this.render_table);
    this.$form.add_post_submit_callback(this.render_table);
    return this.$form;
  }

}


let articulo = new ArticuloModule({
  title: "Articulos",
  api_url: 'api/compras/articulo',

  form_inputs: [
    {
      type: "text", title: "Codigo", name: "codigo", size: 3, validate: {
        required: '',
        pattern: "([a-zA-Z0-9])*",
        title: "Solo Letras y espacios",
        maxLength: 8,
      }
    },

    {
      type: "text", title: "Descripcion", name: "descripcion", size: 6, validate: {
        required: '',
        pattern: "([a-zA-Z0-9\\\s])*",
        title: "Solo Letras y espacios",
        maxLength: 255,
      }
    },

    {
      type: "select", title: "Estatus", name: "status", size: 3, options: {
        text: 'text',
        value: 'text',
        data: ArticuloModule.status
      }
    },

    {
      type: "select_search", title: "Linea", name: "linea_id", size: 6, url: 'api/compras/linea', value: 'id',
      label: ['codigo', 'descripcion'], required: true
    },

    {
      type: "select_search", title: "Unidad de Medida", name: "unidad_medida_id", size: 6, url: 'api/compras/unidad-medida',
      value: 'id', label: ['codigo', 'descripcion'], required: true
    },

    {
      type: "text", title: "Cod. CCCE", name: "codigo_art_ccce", size: 3, validate: {
        pattern: "([0-9])*",
        title: "Solo Letras y espacios",
        maxLength: 9,
      }
    },

    {
      type: "text", title: "Cod. OCEPRE", name: "codigo_ocepre", size: 3, validate: {
        pattern: "([0-9])*",
        title: "Solo Letras y espacios",
        maxLength: 12,
      }
    },

    {
      type: "text", title: "Cod. CNU", name: "codigo_cnu", size: 3, validate: {
        pattern: "([0-9])*",
        title: "Solo Letras y espacios",
        maxLength: 8,
      }
    },

    {
      type: "price", title: "Precio", name: "ultimo_precio", size: 3, validate: {
        required: '',
      }
    },
  ]
});

window.onload =  async function(){
  await articulo.init();
}