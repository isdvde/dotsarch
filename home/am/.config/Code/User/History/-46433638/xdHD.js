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
    value = value.split(':');
    if (value.lenght !== 2) {
      throw new Error("Tamaño de cadena incorrecto");
    }
    let len = parseInt(value[1]);
    if()

  }

  string(opt, value) {

    if(typeof(val) !== 'string') {
      this.result.message = 'No es un string';
      return false;
    }
    // if(len) {
    //   if(val.lenght !== len )
    //   return this
    // }
  }





}