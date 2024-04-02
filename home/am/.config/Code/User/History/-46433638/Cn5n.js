export class Validator {

  constructor(value, opts) {
    this.value = value;
    this.result = {
      'validate': false,
      'message': ''
    };
    if(typeof(opts) === 'string') {
      this.opts = opts.split(',');
      console.log(this.opts)
    } else {
      this.opts = opts;
    }
  }

  paser_opt(opt) {
    opt = opt.split(':');
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
      console.log(ob)
      let op = ob.opt;
      let param = ob.param || '';
      console.log(op)
      // if(!this[op](value=this.value, param=param)){
      if(!this[op](value=this.value)){
        return this.result;
      };
    }
    this.result.validate = true;
    return this.result;
  }

  length(param='', value='') {
    if(value.length > parseInt(param)) {
      this.result.message = 'Tamaño excedido';
      return false;
    }
    return this;
  }

  string(value='') {
    if(typeof(val) !== 'string') {
      this.result.message = 'No es un string';
      return false;
    }
    return this;
  }





}