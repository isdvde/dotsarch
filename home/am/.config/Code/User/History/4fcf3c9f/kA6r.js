import { $ } from "../libs/utils.js";

export class SCSBaseModule {

  static status = [
    { text: "ACTIVO" },
    { text: "INACTIVO" },
  ]

  constructor(opts) {
    if (this.constructor == SCSBaseModule) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    if(!opts) throw new Error("No han sido definidos los parametros de construccion") 

    this.opts = opts;
    this.$root = $(".card-body");
    this.page_title = document.title;
    this.title = this.opts.title;
    this.api_url = this.opts.api_url;

    this.columns = this.opts.columns;
    this.attrs = this.opts.attrs;

    this.table = this.opts.table;
    this.form = this.opts.form;

    // this.form_inputs = this.opts.form_inputs;
  }

  async render_table() {
    throw new Error("Method 'render_table()' must be implemented.");
  }

  render_form() {
    throw new Error("Method 'render_form()' must be implemented.");
  }

  async init() {
    await this.render_table();
  }
}