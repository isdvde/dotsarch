import { SCSTable } from "../components/scs-table.js";
import { clean, $qs, get_quarter, crudder } from "../libs/utils.js";
import { SCSDropdown } from "../components/scs-dropdown.js";
import { SCSDetalleFactory } from "../libs/factories/scs-detalle-factory.js";
import { SCSBaseModule } from "./scs-module-base.js";
import { SCSFormRequisicion } from "../components/scs-form-requisicion.js";
import { get_current_date } from "../libs/utils.js";
import { SCSLoading } from "../components/scs-loading.js";
import { SCSNotification } from "../components/scs-notification.js";

export class SCSRequisicionBase extends SCSBaseModule {
  static prioridad = [
    { text: "NORMAL" },
    { text: "URGENTE" }
  ];

  // static dependencia_solicitante = (async function(){
  //   return (await crudder(`${basePath}/api/compras/unidad-ejecutora`).get()).data;
  // })();

  static dependencia_solicitante = (async function(){
    return (await crudder(`${basePath}/api/compras/unidad-ejecutora`).get()).data;
  })();

  constructor(opts) {
    super(opts);
    // this.dependencia_solicitante = SCSRequisicionBase.dependencia_solicitante;
  }

  async render_table() {
    clean(this.$root);

    this.$root.append(new SCSLoading());

    this.$table = new SCSTable({
      columns: this.columns,
      attrs: this.attrs,
      title: this.title,
      base_url: this.api_url,
      edit: true,
    });

    try {
      this.dependencia_solicitante = await SCSRequisicionBase.dependencia_solicitante;
    } catch(e) {
      console.log(e);
      this.dependencia_solicitante = "";
    }


    let $dropdown_create = new SCSDropdown({ title: "Agregar" });

    $dropdown_create.add_item({
      title: 'Servicios',
      callback: function() {
        this.form_type = 'SERVICIOS';
        this.render_form(true);
      }.bind(this)
    });

    $dropdown_create.add_item({
      title: 'Bienes',
      callback: function() {
        this.form_type = 'BIENES';
        this.render_form(true);
      }.bind(this)
    });


    await this.$table.render();
    this.$table.edit_action = function(){
      return this.render_form();
    }.bind(this)

    this.$table.$button_container.innerHTML = '';
    if(this.dependencia_solicitante) this.$table.$button_container.append($dropdown_create);
      
    clean(this.$root);
    this.$root.append(this.$table);
    if(!this.dependencia_solicitante) this.$root.append(new SCSNotification({data: ["Error al conectar con el servidor, contactese con soporte"]}));
  }

  render_form(create=false) {
    clean(this.$root);
    this.$root.append(new SCSLoading());


    this.add_form();

    if(create){
      this.add_detalle();
    }

    // let $detalles = $qs(this.$form, 'scs-detalle');
    let $detalles = $qs(this.$form, 'scs-detalle-servicios,scs-detalle-bienes');
    if($detalles) $detalles.style.display = "none";

    let $linea = $qs(this.$form, '[name="codigo_linea_servicio"]');
    if($linea){
      let $linea_search = $qs($linea.parentElement, 'input[srch]') 
      new MutationObserver(function(){
        if($linea_search.value) {
          if($detalles) $detalles.style.display = "";
          return;
        }
      if($detalles) {
          $detalles.style.display = "none";
          $detalles.clean_detalles();
      }
      }).observe($linea_search, {childList: true, attributes: true});
    }

    $qs(this.$form, '[name=tipo]').value = this.form_type || '';
    this.$numero = $qs(this.$form,'[name=numero]');
    this.$dependencia_solicitante = $qs(this.$form,'[name=dependencia_solicitante]');
    this.$codigo_dependencia_solicitante = $qs(this.$form,'[name=codigo_dependencia_solicitante]');
    this.$status = $qs(this.$form,'[name=status]');
    this.$fecha_requisicion = $qs(this.$form,'[name=fecha]');
    this.$trimestre = $qs(this.$form,'[name=trimestre]');

    this.$numero.setAttribute('readonly', '');
    this.$dependencia_solicitante.setAttribute('readonly', '');
    this.$codigo_dependencia_solicitante.value = this.dependencia_solicitante.codigo_unidad_ejecutora;
    this.$dependencia_solicitante.value = `${this.dependencia_solicitante.codigo_unidad_ejecutora} - ${this.dependencia_solicitante.unidad_ejecutora}`;
    this.$status.setAttribute('readonly', '');
    this.$trimestre.setAttribute('readonly', '');
    this.$fecha_requisicion.setAttribute('max', get_current_date());


    if(create){ 
      this.$status.value = "TRANSCRITO"; 
      this.init_date();
      this.set_default_prioridad();
    }

    this.$fecha_requisicion.addEventListener('change', function(e) {
      if(this.$fecha_requisicion.value !== ''){
        this.$trimestre.value = get_quarter(this.$fecha_requisicion.value);
        return;
      }
      this.$trimestre.value = '';
    });

    this.$form.$cancel.addEventListener('click', this.render_table.bind(this));
    this.$form.add_post_submit_callback(this.render_table.bind(this));

    clean(this.$root);
    this.$root.append(this.$form);

    return this.$form;
  }

  add_form(){
    this.$form = new SCSFormRequisicion({
      title: "Detalles de Requisicion",
      url: this.api_url,
      form_inputs: this.form_inputs,
    });
    this.$form.load_inputs();
  }

  add_detalle(){
    let $detalles = SCSDetalleFactory(this.form_type).create({solicitud: false});
    this.$form.add_input($detalles);
  }

  set_default_prioridad(){
    $qs(this.$form, '[name="prioridad"] option[value="NORMAL"]').selected = "selected";
  }

  init_date(){
    this.$fecha_requisicion.value = get_current_date();
    this.$trimestre.value = get_quarter(this.$fecha_requisicion.value);
  }
}