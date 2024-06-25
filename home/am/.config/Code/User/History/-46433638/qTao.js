export class Validator {
  constructor(node) {
    this.$node = node;
    this.validity = node.validity;

    this.result = {
      validate: false,
      message: "",
    };
  }

  validate() {
    if(this.validity.valid){
      this.result.validate = true;
      return this.result;
    }

    for(let attr in this.validity){
      if(this.validity[attr]){
        this.result.message = this.$node.validationMessage;
        this.result.validate = false;
        return this.result;
      }
    }

    for (let opt of this.opts) {
      let ob = this.paser_opt(opt);
      let op = ob.opt;
      if (!this[op]({ ...ob, value: this.value })) {
        return this.result;
      }
    }
    this.result.validate = true;
    return this.result;
  }

  // constructor(value, opts) {
  //   this.value = value;
  //   this.result = {
  //     validate: false,
  //     message: "",
  //   };
  //   if (typeof opts === "string") {
  //     this.opts = opts.split(",");
  //   } else {
  //     this.opts = opts;
  //   }
  // }

  // paser_opt(opt) {
  //   opt = opt.split(":");
  //   return {
  //     opt: opt[0],
  //     param: opt[1] || "",
  //   };
  // }

  // validate() {
  //   for (let opt of this.opts) {
  //     let ob = this.paser_opt(opt);
  //     let op = ob.opt;
  //     if (!this[op]({ ...ob, value: this.value })) {
  //       return this.result;
  //     }
  //   }
  //   this.result.validate = true;
  //   return this.result;
  // }

  // lenght(ob) {
  //   if (ob.value.length > parseInt(ob.param)) {
  //     this.result.message = "Tamaño excedido";
  //     return false;
  //   }
  //   return this;
  // }

  // string(ob) {
  //   if (typeof ob.value !== "string") {
  //     this.result.message = "No es un string";
  //     return false;
  //   }
  //   return this;
  // }

  // notnull(ob) {
  //   if(ob.value.length === 0) {
  //     this.result.message = "El elemento no puede estar vacio";
  //     return false;
  //   }
  //   return this;
  // }
}