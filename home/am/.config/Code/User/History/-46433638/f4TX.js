export class Validator {
  constructor(node) {
    this.$node = node;
    this.validity = node.validity;

    this.result = {
      validate: false,
      message: "",
    };

    this.msgs = {
      valueMissing: "Debe completar este campo",

    };
  }

  validate() {
    if (this.validity.valid) {
      this.result.validate = true;
      return this.result;
    }

    for (let attr in this.validity) {
      if (this.validity[attr]) {
        this.result.message = this.$node.validationMessage;
        this.result.validate = false;
        return this.result;
      }
    }
  }

  isValid() {

    // If field is required and empty
    if (this.validity.valueMissing)
      this.result.message = "Debe completar este campo";

    // If not the right type
    if (this.validity.typeMismatch) {
      // Email
      if (this.$node.type === "email")
      this.result.message = "Por favor, ingrese un email valido";

      // URL
      if (this.$node.type === "url")
      this.result.message = "Por favor ingrese una URL valida";
    }

    // If too short
    if (this.validity.tooShort)
      this.result.message = `El tamaño minimo de este campo es de ${this.$node.getAttribute("minLength")} caracteres, actualmente tiene ${this.$node.value.length} caracteres.`;

    // If too long
    if (this.validity.tooLong)
      this.result.message = `El tamaño maximo de este campo es de ${this.$node.getAttribute("maxLength")} caracteres, actualmente tiene ${this.$node.value.length} caracteres.`

    // If number input isn't a number
    if (this.validity.badInput) return "Solo permite valores numericos";

    // If a number value doesn't match the step interval
    if (this.validity.stepMismatch) return "Ingrese un valor valido";

    // If a number field is over the max
    if (this.validity.rangeOverflow)
      this.result.message = `Ingrese un valor no mayor a ${field.getAttribute("max")}`;

    // If a number field is below the min
    if (this.validity.rangeUnderflow)
      this.result.message = `Ingrese un valor no menor a ${field.getAttribute("min")}`;

    // If pattern doesn't match
    if (this.validity.patternMismatch) {
      // If pattern info is included, return custom error
      if (this.$node.hasAttribute("title"))
        this.result.message = this.$node.getAttribute("title");
      else 
        // Otherwise, generic error
        this.result.message = "Ingrese el formato correcto";
    }
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