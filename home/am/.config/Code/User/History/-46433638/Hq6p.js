export class Validator {
  constructor(value, opts) {
    this.value = value;
    this.result = {
      validate: false,
      message: "",
    };
    if (typeof opts === "string") {
      this.opts = opts.split(",");
    } else {
      this.opts = opts;
    }
  }

  paser_opt(opt) {
    console.log("🚀 ~ Validator ~ paser_opt ~ opt:", opt);
    opt = opt.split(":");
    console.log("🚀 ~ Validator ~ paser_opt ~ opt after:", opt);
    return {
      opt: opt[0],
      param: opt[1] || "",
    };
  }

  validate() {
    for (let opt of this.opts) {
      let ob = this.paser_opt(opt);
      console.log("🚀 ~ Validator ~ validate ~ ob:", ob);
      let op = ob.opt;
      let param = ob.param || "";
      if (!this[op]({ ...ob, value: this.value })) {
        return this.result;
      }
    }
    this.result.validate = true;
    return this.result;
  }

  lenght(ob) {
    console.log("🚀 ~ Validator ~ lenght ~ ob:", ob);
    if (ob.value.lenght > parseInt(ob.param)) {
      this.result.message = "Tamaño excedido";
      return false;
    }
    return this;
  }

  string(ob) {
    if (typeof ob.value !== "string") {
      this.result.message = "No es un string";
      return false;
    }
    return this;
  }
}