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
    opt = opt.split(':');
    if (opt.lenght !== 2) {
      throw new Error("Tamaño de cadena incorrecto");
    }
    // let param = parseInt(opt[1]);
    return opt[1];
  }

  validate() {
    for (let opt of this.opts) {
      if(!this[opt](this.value)){
        return this.result;
      };
    }
    this.result.validate = true;
    return this.result;
  }

  lenght(opt, value) {
    if(value.lenght !== len) {
      this.result.message = 'No es un string';
      return false;
    }
    return this;
  }

  string(opt, value) {
    if(typeof(val) !== 'string') {
      this.result.message = 'No es un string';
      return false;
    }
    return this;
  }





}