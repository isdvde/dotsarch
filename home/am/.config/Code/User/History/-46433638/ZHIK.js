export class Validator {

  constructor(value, opts) {
    this.value = value;
    this.result = {
      'validate': false,
      'message': ''
    };
    if(typeof(opts) === 'string') {
      this.opts = opts.split(',');
    } else {
      this.opts = opts;
    }
  }

  paser_opt(opt) {
    console.log("🚀 ~ Validator ~ paser_opt ~ opt:", opt)
    opt = opt.split(':');
    console.log("🚀 ~ Validator ~ paser_opt ~ opt:", opt)
    if (opt.lenght !== 2) {
      return {'opt': opt[0]};
    }
    ob = {
      'opt': opt[0],
      'param': opt[1]
    };
    return ob;
  }

  validate() {
    for (let opt of this.opts) {
      let ob = this.paser_opt(opt);
      console.log("🚀 ~ Validator ~ validate ~ ob:", ob)
      let op = ob.opt;
      let param = ob.param || '';
      if(!this[op]({...ob,'value': this.value})) {
        return this.result;
      };
    }
    this.result.validate = true;
    return this.result;
  }

  lenght(ob) {
    if(ob.value.lenght > parseInt(ob.param)) {
      this.result.message = 'Tamaño excedido';
      return false;
    }
    return this;
  }

  string(ob) {
    if(typeof(ob.value) !== 'string') {
      this.result.message = 'No es un string';
      return false;
    }
    return this;
  }





}