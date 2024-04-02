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
      return opt;
    }
    ob = {
      'opt': opt[0],
      'param': opt[1]
    };
    console.log(ob)
    return ob;
  }

  validate() {
    for (let opt of this.opts) {
      console.log(opt)
      let ob = this.paser_opt(opt);
      let op = ob.opt;
      let param = ob.param || '';
      console.log(ob)
      if(!this[ob.opt](param=ob.param || '', value=this.value)){
        return this.result;
      };
    }
    this.result.validate = true;
    return this.result;
  }

  lenght(param, value) {
    if(value.lenght > parseInt(param)) {
      this.result.message = 'Tamaño excedido';
      return false;
    }
    return this;
  }

  string(value) {
    if(typeof(val) !== 'string') {
      this.result.message = 'No es un string';
      return false;
    }
    return this;
  }





}